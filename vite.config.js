import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import chatHandler from './api/chat.js'

function localChatApi() {
  return {
    name: 'orayen-local-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        let body = ''
        let tooLarge = false

        req.on('data', (chunk) => {
          if (tooLarge) return
          body += chunk
          if (Buffer.byteLength(body) > 32768) {
            tooLarge = true
            res.statusCode = 413
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Request body is too large.' }))
            req.resume()
          }
        })

        req.on('end', async () => {
          if (tooLarge) return
          try {
            req.body = body ? JSON.parse(body) : {}
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Request body must be valid JSON.' }))
            return
          }

          res.status = (statusCode) => {
            res.statusCode = statusCode
            return res
          }
          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return res
          }

          try {
            await chatHandler(req, res)
          } catch (error) {
            console.error('Local chatbot API failed:', error)
            if (!res.writableEnded) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'The chat service encountered an unexpected error.' }))
            }
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (!process.env.OPENAI_API_KEY && env.OPENAI_API_KEY) {
    process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
  }

  return {
    base: './',
    plugins: [react(), tailwindcss(), localChatApi()],
  }
})

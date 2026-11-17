import { useEffect, useRef, useState } from 'react'

const welcomeMessage = {
  role: 'assistant',
  content: 'Hi! I’m ORAYEN’s AI assistant. Ask me about our services or how to get started.',
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([welcomeMessage])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const messagesEndRef = useRef(null)

  function closeChat() {
    setIsOpen(false)
    launcherRef.current?.focus()
  }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'instant' })
  }, [messages, isLoading])

  useEffect(() => {
    if (!isOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        closeChat()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  async function sendMessage(event) {
    event.preventDefault()
    const content = draft.trim()
    if (!content || isLoading) return

    const userMessage = { role: 'user', content }
    const conversation = [
      ...messages.filter((message) => !message.isError),
      userMessage,
    ].slice(-12)

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setDraft('')
    setIsLoading(true)

    try {
      let response
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversation.map(({ role, content: text }) => ({ role, content: text })) }),
        })
      } catch (error) {
        console.error('Could not reach the chatbot API:', error)
        throw new Error('Could not reach the chat service. Please try again or email orayen.tech@gmail.com.')
      }

      let result
      try {
        result = await response.json()
      } catch (error) {
        console.error('The chatbot API returned an invalid response:', error)
        throw new Error('The chat service returned an invalid response. Please try again.')
      }

      if (!response.ok) {
        throw new Error(result.error || 'The assistant could not respond. Please try again.')
      }
      if (typeof result.answer !== 'string' || !result.answer.trim()) {
        throw new Error('The assistant returned an empty response. Please try again.')
      }

      setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: result.answer.trim() }])
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'The chat service is unavailable. Please try again.',
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chatbot-widget">
      <section className="chatbot-panel" id="orayen-chat" role="dialog" aria-modal="false" aria-labelledby="chatbot-title" hidden={!isOpen}>
          <div className="chatbot-header">
            <div>
              <h2 id="chatbot-title">Chat with ORAYEN</h2>
              <p>AI assistant · Messages are processed by OpenAI. Don’t share sensitive details.</p>
            </div>
            <button className="chatbot-close" type="button" aria-label="Close chat" onClick={closeChat}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="chatbot-messages" role="log" aria-label="Conversation" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chatbot-message chatbot-message-${message.role}${message.isError ? ' chatbot-message-error' : ''}`} key={`${index}-${message.role}`}>
                <span className="chatbot-sender">{message.role === 'user' ? 'You' : 'ORAYEN'}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {isLoading && <p className="chatbot-loading" role="status">Thinking…</p>}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
              maxLength={2000}
              disabled={isLoading}
              required
            />
            <button className="chatbot-send" type="submit" aria-label="Send message" disabled={isLoading || !draft.trim()}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12 20 4l-5 16-3-7-8-1Zm8 1 8-9" />
              </svg>
            </button>
          </form>
      </section>

      <button
        ref={launcherRef}
        className="chatbot-launcher"
        type="button"
        aria-label={isOpen ? 'Close chat with ORAYEN' : 'Open chat with ORAYEN'}
        aria-expanded={isOpen}
        aria-controls="orayen-chat"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.8L4 20l1.2-4A7.5 7.5 0 1 1 20 11.5Z" />
            <path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" />
          </svg>
        )}
      </button>
    </div>
  )
}

const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 2000

const instructions = `You are ORAYEN's AI customer-support assistant. Answer clearly, helpfully, and concisely. You may answer general questions, but for questions about ORAYEN only use the facts below and never invent prices, delivery times, guarantees, or services.

ORAYEN is a Sri Lanka-based technology and digital solutions company serving businesses and individuals.
Services: Web Development, Mobile Application Development, UI/UX Design, Graphic Design, and Canva Design.
Project costs and timelines depend on the scope and requirements. Invite customers to share their project details for a tailored discussion.
Customers can request an online meeting through the website contact form.
Contact: orayen.tech@gmail.com; phone/WhatsApp 070 367 0956 (international: +94 70 367 0956).

If you do not know an ORAYEN-specific answer, say so and suggest contacting the team. Do not request passwords, payment card details, or other sensitive information.`

function sendError(res, status, message) {
  return res.status(status).json({ error: message })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendError(res, 405, 'Only POST requests are supported.')
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return sendError(res, 503, 'The chat assistant is not configured yet. Please email orayen.tech@gmail.com.')
  }

  const messages = req.body?.messages
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return sendError(res, 400, 'Please send a conversation with no more than 12 messages.')
  }

  const input = []
  for (const message of messages) {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string') {
      return sendError(res, 400, 'The conversation contains an invalid message.')
    }

    const content = message.content.trim()
    if (!content || content.length > MAX_MESSAGE_LENGTH) {
      return sendError(res, 400, 'Each message must be between 1 and 2,000 characters.')
    }
    input.push({ role: message.role, content })
  }

  if (input[input.length - 1].role !== 'user') {
    return sendError(res, 400, 'The last message must be a customer question.')
  }

  let openAiResponse
  try {
    openAiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        instructions,
        input,
        max_output_tokens: 500,
        store: false,
      }),
    })
  } catch (error) {
    console.error('OpenAI chat request failed:', error)
    return sendError(res, 502, 'The chat service is temporarily unavailable. Please try again or email orayen.tech@gmail.com.')
  }

  let result
  try {
    result = await openAiResponse.json()
  } catch (error) {
    console.error('Could not read the OpenAI chat response:', error)
    return sendError(res, 502, 'The chat service returned an invalid response. Please try again.')
  }

  if (!openAiResponse.ok) {
    console.error('OpenAI chat request returned an error:', openAiResponse.status, result?.error?.code || 'unknown')
    return sendError(res, openAiResponse.status === 429 ? 503 : 502, 'The assistant could not respond right now. Please try again or email orayen.tech@gmail.com.')
  }

  const answer = typeof result.output_text === 'string'
    ? result.output_text.trim()
    : (result.output || [])
      .flatMap((item) => item.content || [])
      .filter((item) => item.type === 'output_text' && typeof item.text === 'string')
      .map((item) => item.text)
      .join('\n')
      .trim()

  if (!answer) {
    console.error('OpenAI returned no text for the chat request.')
    return sendError(res, 502, 'The assistant returned an empty response. Please try again.')
  }

  return res.status(200).json({ answer })
}

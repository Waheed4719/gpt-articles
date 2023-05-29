import { OpenAIStream, OpenAIStreamPayload } from '@/utils/openAIStream'
export type ChatGPTAgent = 'User' | 'system'
export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { messages } = (await req.json()) as {
    messages?: ChatGPTMessage[]
  }

  if (!messages) {
    return new Response('No messages in the request', { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true,
  }
  try {
    const stream = await OpenAIStream(payload)
    return new Response(stream)
  } catch (error) {
    return new Response('Error occurred while streaming', { status: 500 })
  }
}
export default handler

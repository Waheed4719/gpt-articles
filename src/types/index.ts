import { CreateCompletionRequest } from 'openai'

export interface ChatCompletionRequest extends CreateCompletionRequest {
  messages: {
    role: string
    content: string
  }[]
}

export type MessageObjectType = {
  message: string
  direction: 'incoming' | 'outgoing'
  sender: 'ChatGPT' | 'User'
}

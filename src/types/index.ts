import { CreateCompletionRequest } from 'openai'
import { Document } from 'langchain/document'

export interface ChatCompletionRequest extends CreateCompletionRequest {
  messages: {
    role: string
    content: string
  }[]
}

export type MessageObjectType = {
  message: string
  sender: 'ChatGPT' | 'User'
  type?: 'apiMessage' | 'userMessage'
  sourceDocs?: Document[]
}

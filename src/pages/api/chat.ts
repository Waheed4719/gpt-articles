import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { messages, model } = JSON.parse(req.body)
    const completion = await openai.createChatCompletion({
      model: (model as string) ?? 'gpt-3.5-turbo',
      messages,
      // model: 'text-davinci-003',
      // temperature: 0.5,
      // max_tokens: 60,
      // top_p: 0.3,
      // frequency_penalty: 0.5,
      // presence_penalty: 0,
    })
    res.status(200).json(completion.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}

import { NextApiResponse, NextApiRequest } from 'next'
import { OpenAIApi, Configuration } from 'openai'
import { dummyText } from '../../constants'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

const summarize = async (text: string) => {
  const prompt = `
    Please summarize this text:
  
    ${text}
    `
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.5,
      max_tokens: 2000,
    })

    const result = response.data.choices[0].text
    return result
  } catch (err) {
    console.log('err', err)
    return ''
  }
}

const summarizeLargeText = async (text: string) => {
  const chunkSize = 2048
  const chunks = []
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize))
  }

  const summaries = []
  for (const chunk of chunks) {
    const summary = await summarize(chunk)
    summaries.push(summary)
  }
  return summaries.join(' ')
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const largeText = await summarizeLargeText(dummyText)
  //   const summary = await summarize(text as string)
  console.log(largeText)
  const prompt = `
  Please write a literature review on this summarized text:

  ${largeText}
  `
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.5,
    max_tokens: 2000,
  })

  return res.status(200).json({ largeText: response.data.choices[0].text })
}
export default handler

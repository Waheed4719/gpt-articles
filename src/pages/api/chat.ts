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
    const comp = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `write a literature review on following article \n You can reduce your risk for heart disease through lifestyle choices and taking the steps below: Manage your cholesterol and blood pressure levels Get tested and manage your diabetes Exercise regularly Maintain a healthy weight Avoid smoking Drink responsibly Keep stress under control Although heart disease is preventable through modifying lifestyle factors above, some risk factors are beyond your control, such as: Age: Your risk increases the older you get. Family history: If you have a male relative with heart disease before the age of 55, or a female relative with heart disease before the age of 65, you may have an increased risk. The more knowledge you have about your family’s medical history, the better. Ethnicity: African Americans, Mexican Americans, American Indians, native Hawaiians and South Asian Americans have an increased risk of heart disease. However, you can significantly lower your risk of heart disease by managing or reducing the risk factors you can control through healthy lifestyle changes. Ohio State’s Heart and Vascular Center is committed to improving your health by helping you take steps to prevent heart disease before problems arise.`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    console.log(comp.data)
    res.status(200).json(completion.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}

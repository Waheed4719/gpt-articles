import { OpenAI } from 'langchain/llms/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import {
  ConversationalRetrievalQAChain,
  VectorDBQAChain,
} from 'langchain/chains'

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question. Also write articles based on documents provided.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`
// politely respond that you are tuned to only answer questions that are related to the context.
const QA_PROMPT = `You are a helpful Researcher in A high Impaction Factor Journal. Use the following pieces of context to answer the question at the end and/or write articles based on documents provided if asked.

If asked about summary or literature review about a particular document, try to give a summary as best as you can from that specific document, do not try to make up an answer and don't just write what the topic of the book is.
If the question is not related to the context, try to answer it from your own knowledgebase".

{context}

Question: {question}
Helpful answer in markdown:`

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0.5, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    streaming: true,
  })

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(2),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    }
  )
  return chain
}

import { useRef, useState, useEffect } from 'react'
import Layout from '@/components/layout'
import { MessageObjectType } from '@/types'
import { Document } from 'langchain/document'
import MessageActionBox from '@/components/MessageActionBox'
import MessageList from '@/components/MessageList'

const DocuChat = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [messageState, setMessageState] = useState<{
    messages: MessageObjectType[]
    pending?: string
    history: [string, string][]
    pendingSourceDocs?: Document[]
  }>({
    messages: [
      {
        message:
          'Hi, what would you like to learn about this medical literature?',
        sender: 'ChatGPT',
      },
    ],
    history: [],
  })
  const scrollToDiv = useRef<HTMLDivElement>(null)
  const { messages, history } = messageState

  const messageListRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])

  //handle form submission
  async function handleSubmit(value: string) {
    // e.preventDefault()

    setError(null)

    if (!value) {
      alert('Please input a question')
      return
    }

    const question = value.trim()

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          sender: 'User',
          message: question,
        },
      ],
    }))

    setIsTyping(true)

    try {
      const response = await fetch('/api/langchain-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      })
      const data = await response.json()
      console.log('data', data)

      if (data.error) {
        setError(data.error)
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              sender: 'ChatGPT',
              message: data.text as string,
              sourceDocs: data.sourceDocuments as Document[],
            },
          ],
          history: [...state.history, [question, data.text]],
        }))
      }
      console.log('messageState', messageState)

      setIsTyping(false)

      //scroll to bottom
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight)
    } catch (error) {
      setIsTyping(false)
      setError('An error occurred while fetching the data. Please try again.')
      console.log('error', error)
    }
  }

  return (
    <>
      <Layout>
        <h1 className='text-2xl font-bold leading-[1.1] tracking-tighter text-center text-white'>
          Chat With Your Docs
        </h1>
        <div className='relative w-full'>
          <div className='pt-[20px] rounded-md bg-transparent h-full'>
            <MessageList messages={messages} />
            <div ref={scrollToDiv}></div>
            <MessageActionBox
              typingIndicator={isTyping}
              placeholder='Type message here'
              onSend={handleSubmit}
            />
            {error && (
              <div className='border border-red-400 rounded-md p-4'>
                <p className='text-red-500'>{error}</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default DocuChat

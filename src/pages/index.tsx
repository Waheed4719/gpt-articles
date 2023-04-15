import { ChatCompletionRequest, MessageObjectType } from '@/types'
import { useState, useRef } from 'react'
import MessageList from '@/components/MessageList'
import MessageActionBox from '@/components/MessageActionBox'
import Layout from '@/components/layout'

const App = () => {
  const [messages, setMessages] = useState<MessageObjectType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sender: 'ChatGPT',
    },
  ])
  const [systemMsg, setSystemMsg] = useState<{
    role: 'system'
    content: string
  }>({
    role: 'system',
    content: 'Write a literature review on the text i send you',
    // "Explain things like you're talking to a medical professional with 5 years of experience.",
  })
  const [isTyping, setIsTyping] = useState(false)
  const scrollToDiv = useRef<HTMLDivElement>(null)
  const [typingAnswer, setTypingAnswer] = useState<string>('')

  const handleSend = async (message: string) => {
    const newMessage: MessageObjectType = {
      message,
      sender: 'User',
    }

    const newMessages = [...messages, newMessage]

    setMessages(newMessages)
    setIsTyping(true)
    scrollToBottom()
    await processMessageToChatGPT(newMessages)
    setIsTyping(false)
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollToDiv.current === null) {
        return
      }
      scrollToDiv.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }, 100)
  }

  const processMessageToChatGPT = async (chatMessages: MessageObjectType[]) => {
    setIsTyping(true)

    const apiMessages = chatMessages.map((messageObject) => {
      let role = ''
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant'
      } else {
        role = 'user'
      }
      return { role: role, content: messageObject.message }
    })
    const apiRequestBody: ChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: [
        systemMsg, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    }
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false
    let answer = ''
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      answer += chunkValue
      setTypingAnswer((prev) => prev + chunkValue)
      scrollToBottom()
    }
    if (done) {
      setMessages([
        ...chatMessages,
        {
          message: answer,
          sender: 'ChatGPT',
        },
      ])
      setTypingAnswer('')
    }
  }

  return (
    <Layout>
      <h1 className='text-2xl font-bold leading-[1.1] tracking-tighter text-center text-white'>
        Chat With ChatGPT
      </h1>
      <div className='relative w-full'>
        <div className='pt-[20px] rounded-md bg-transparent h-full'>
          <MessageList messages={messages} typingAnswer={typingAnswer} />
          <div ref={scrollToDiv}></div>
          <MessageActionBox
            typingIndicator={isTyping}
            placeholder='Type message here'
            onSend={handleSend}
          />
        </div>
      </div>
    </Layout>
  )
}

export default App

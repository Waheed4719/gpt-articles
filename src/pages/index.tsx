import { Quicksand } from 'next/font/google'
import { CreateCompletionRequest } from 'openai'
import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react'

const quicksand = Quicksand({ subsets: ['latin'] })

interface ChatCompletionRequest extends CreateCompletionRequest {
  messages: {
    role: string
    content: string
  }[]
}

type MessageObjectType = {
  message: string
  direction?:  "incoming" | "outgoing" | 0 | 1;
  sender: 'ChatGPT' | 'user'
  position: 'normal' | 'first' | 'last' | 'only'
}

const App = () => {
  const [messages, setMessages] = useState<MessageObjectType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      direction: 'incoming',
      sender: 'ChatGPT',
      position: 'normal',
      // sentTime: "just now",
    },
  ])
  const [systemMsg, setSystemMsg] = useState<{
    role: 'system'
    content: string
  }>({
    role: 'system',
    content:
      "Explain things like you're talking to a medical professional with 5 years of experience.",
  })
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (message: string) => {
    const newMessage: MessageObjectType = {
      message,
      direction: 'outgoing',
      sender: 'user',
      position: 'normal',
    }

    const newMessages = [...messages, newMessage]

    setMessages(newMessages)

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true)
    await processMessageToChatGPT(newMessages)
    setIsTyping(false)
  }

  async function processMessageToChatGPT(chatMessages: MessageObjectType[]) {
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
    try{
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify(apiRequestBody),
      }).then((data: Response) => {
        return data.json()
      })
  
      setMessages([
        ...chatMessages,
        {
          message: response.choices[0].message.content as string,
          sender: 'ChatGPT',
          position: 'normal',
        },
      ])
      
    }catch(err){
      console.log(err)
    }
    setIsTyping(false)
  }

  return (
    <div className='w-screen h-screen p-[40px]'>
      <div className='relative h-full w-full'>
        <button
          type='button'
          onClick={() =>
            setSystemMsg({ role: 'system', content: 'talk like a teacher' })
          }
        >
          Change prompt
        </button>
        <MainContainer className='pt-[20px] rounded-md'>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content='ChatGPT is typing' />
                ) : null
              }
            >
              {messages.map((message) => {
                return (
                  <Message
                    key={message.message}
                    model={message}
                    className={`${quicksand.className}`}
                  />
                )
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App

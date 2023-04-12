import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

type MessageObjectType = {
  message: string
  direction: 'incoming' | 'outgoing' | 0 | 1
  sender: 'ChatGPT' | 'user'
  position: 'normal' | 'first' | 'last' | 'only'
}

type Props = {
  messages: MessageObjectType[]
  typingAnswer: string | null
}

const MessageList = ({ messages, typingAnswer }: Props) => {
  const renderTypingAnswer = (answer: string) => {
    if (!answer) {
      return null
    }
    return (
      <div className='flex flex-col p-[20px]'>
        <div className=' rounded-xl w-full md:w-[800px]  mx-auto mt-1'>
          <div className='text-sm text-white leading-[28px]'>
            {answer.split('```').map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <p className='mb-[20px]' key={item[0]}>
                    {item}
                  </p>
                )
              } else {
                const delimiter = '\n'

                const idx = item.indexOf(delimiter)
                const language = item.substring(0, idx)
                const code = item.substring(idx + 1)
                return (
                  <SyntaxHighlighter
                    key={index}
                    language={language ?? 'javascript'}
                    style={dracula}
                    className='mb-[20px] p-[20px_!important] rounded-md'
                  >
                    {code}
                  </SyntaxHighlighter>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='smooth-scroll bg-transparent pb-[150px] '>
      {messages.map((message) => {
        return (
          <div key={message.message} className='flex flex-col bg-transparent'>
            {message.sender === 'ChatGPT' ? (
              <div className='flex flex-col p-[20px]'>
                <div className=' rounded-xl w-full md:w-[800px]  mx-auto mt-1'>
                  <div className='text-sm text-white leading-[28px]'>
                    {message.message.split('```').map((item, index) => {
                      if (index % 2 === 0) {
                        return (
                          <p className='mb-[20px]' key={item[0]}>
                            {item}
                          </p>
                        )
                      } else {
                        const delimiter = '\n'

                        const idx = item.indexOf(delimiter)
                        const language = item.substring(0, idx)
                        const code = item.substring(idx + 1)
                        return (
                          <SyntaxHighlighter
                            key={index}
                            language={language ?? 'javascript'}
                            style={dracula}
                            className='mb-[20px] p-[20px_!important] rounded-md'
                          >
                            {code}
                          </SyntaxHighlighter>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col  p-[20px] bg-[#343541]'>
                <div className=' rounded-xl w-full md:w-[800px]  mx-auto mt-1'>
                  <p className='text-sm text-white leading-[28px]'>
                    {message.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      })}
      {typingAnswer && renderTypingAnswer(typingAnswer)}
    </div>
  )
}

export default MessageList

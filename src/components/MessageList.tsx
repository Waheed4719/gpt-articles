import React from 'react'

type MessageObjectType = {
  message: string
  direction: 'incoming' | 'outgoing' | 0 | 1
  sender: 'ChatGPT' | 'user'
  position: 'normal' | 'first' | 'last' | 'only'
}

type Props = {
  messages: MessageObjectType[]
}

const MessageList = ({ messages }: Props) => {
  return (
    <div className='smooth-scroll bg-transparent h-full pb-[200px] '>
      {messages.map((message) => {
        return (
          <div key={message.message} className='flex flex-col bg-transparent'>
            {message.sender === 'ChatGPT' ? (
              <div className='flex flex-col p-[20px]'>
                <div className=' rounded-xl w-full md:w-[800px]  mx-auto mt-1'>
                  <p className='text-sm text-white leading-[28px]'>
                    {message.message}
                  </p>
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
    </div>
  )
}

export default MessageList

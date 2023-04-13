import React, { useState, useRef } from 'react'
import UploadFiles from './UploadFiles'
import TypingIndicator from './TypingIndicator'
import MessageInput from './MessageInput'
import MessageSendBtn from './MessageSendBtn'

type Props = {
  onSend: (message: string) => Promise<void>
  placeholder: string
  typingIndicator: boolean
}

const MessageActionBox = ({ onSend, placeholder, typingIndicator }: Props) => {
  const [textInput, setTextInput] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const handleMessageSend = () => {
    if (textInput !== '') {
      onSend(textInput)
      if (textAreaRef.current) {
        textAreaRef.current.style.height = `24px`
      }
    }
    setTextInput('')
  }
  const handleInputChange = (val: string) => {
    setTextInput(val)
  }

  return (
    <div className='w-full flex flex-col fixed bottom-[0px] h-[100px] bg-gradient-linear-fade  justify-start items-center gap-1'>
      <TypingIndicator isTyping={typingIndicator} />
      <div className='absolute w-[calc(100vw-20px)]   bottom-[60px] px-[45px] py-2 md:py-3 md:pr-4 flex flex-col md:w-[800px] border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'>
        <UploadFiles />
        <MessageInput
          onSend={handleMessageSend}
          placeholder={placeholder}
          onChangeInput={handleInputChange}
        />
        <MessageSendBtn onSend={handleMessageSend} />
      </div>
    </div>
  )
}

export default MessageActionBox

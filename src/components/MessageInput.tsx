import React, { useState, useRef } from 'react'
import { text } from 'stream/consumers'

type Props = {
  onSend: (message: string) => Promise<void>
  placeholder: string
  typingIndicator: boolean
}

const MessageInput = ({ onSend, placeholder, typingIndicator }: Props) => {
  const [textInput, setTextInput] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const handleSendMessage = () => {
    if (textInput !== '') {
      onSend(textInput)
      setTextInput('')
      if (textAreaRef.current) {
        textAreaRef.current.style.height = `24px`
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e?.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef?.current) {
      const { scrollHeight } = textAreaRef.current
      if (e.target.value.length === 0) {
        // added check for empty string
        textAreaRef.current.style.height = '24px'
      }
      if (e.target.value.length < textInput.length) {
        // added check for content length decreasing
        textAreaRef.current.style.height = 'auto'
        if (textAreaRef.current.scrollHeight < 200) {
          // add check for scrollHeight
          textAreaRef.current.style.height = `24px`
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        } else {
          textAreaRef.current.style.height = '200px'
        }
      } else if (scrollHeight < 200) {
        textAreaRef.current.style.height = '24px'
        textAreaRef.current.style.height = `${scrollHeight}px`
        textAreaRef.current.style.overflow = 'hidden'
      } else {
        textAreaRef.current.style.height = '200px'
        textAreaRef.current.style.overflow = 'auto'
      }
    }

    setTextInput(e.target.value)
  }

  return (
    <div className=' w-full flex fixed bottom-[80px] justify-center items-center gap-2'>
      <div className='relative pl-[45px] py-2 md:py-3 md:pr-4 flex flex-col w-full md:w-[800px] border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'>
        <button type='button' className='absolute left-[10px] flex text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
            />
          </svg>
        </button>
        <textarea
          ref={textAreaRef}
          className='outline-none mx-auto text-white max-h-[200px] h-[24px] m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0'
          value={textInput}
          placeholder={placeholder}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
        <button
          type='button'
          onClick={handleSendMessage}
          className='flex text-white absolute right-[10px]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MessageInput

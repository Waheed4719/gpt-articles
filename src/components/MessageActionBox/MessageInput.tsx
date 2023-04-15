import React, { useState, useRef } from 'react'

type Props = {
  onSend: () => void
  placeholder: string
  onChangeInput?: (value: string) => void
  isTyping: boolean
}

const MessageInput = ({
  onSend,
  placeholder,
  onChangeInput,
  isTyping,
}: Props) => {
  const [textInput, setTextInput] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = () => {
    onSend && onSend()
    setTextInput('')
    onChangeInput && onChangeInput('')
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = '24px'
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
    onChangeInput && onChangeInput(e.target.value)
  }

  return (
    <textarea
      disabled={isTyping}
      ref={textAreaRef}
      className='outline-none mx-auto text-white max-h-[200px] h-[24px] m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0'
      value={textInput}
      placeholder={placeholder}
      onChange={handleChangeInput}
      onKeyDown={handleKeyDown}
    />
  )
}

export default MessageInput

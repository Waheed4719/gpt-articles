import React from 'react'

type Props = {
  isTyping: boolean
}

const TypingIndicator = ({ isTyping }: Props) => {
  if (!isTyping) {
    return null
  }
  return (
    <div className='w-full md:w-[800px] mx-auto text-[lightgray]'>
      ChatGPT is typing...
    </div>
  )
}

export default TypingIndicator

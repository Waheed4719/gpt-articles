import React from 'react'
import Message from './Message'
import { MessageObjectType } from '@/types'

type Props = {
  messages: MessageObjectType[]
  typingAnswer?: string | null
}

const MessageList = ({ messages, typingAnswer }: Props) => {
  const renderTypingAnswer = (answer: string) => {
    if (!answer) {
      return null
    }
    const answerObj = {
      sender: 'ChatGPT',
      message: answer,
    } as MessageObjectType
    return <Message message={answerObj} />
  }
  return (
    <div className='smooth-scroll min-h-[55vh] bg-transparent pb-[150px] message-list'>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {typingAnswer && renderTypingAnswer(typingAnswer)}
    </div>
  )
}

export default MessageList

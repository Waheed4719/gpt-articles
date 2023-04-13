import React from 'react'
import Message from './MessageList/Message'
import { MessageObjectType } from '@/types'

type Props = {
  messages: MessageObjectType[]
  typingAnswer: string | null
}

const MessageList = ({ messages, typingAnswer }: Props) => {
  const renderTypingAnswer = (answer: string) => {
    if (!answer) {
      return null
    }
    const answerObj = {
      sender: 'ChatGPT',
      message: answer,
      direction: 'incoming',
    } as MessageObjectType
    return <Message message={answerObj} />
  }
  return (
    <div className='smooth-scroll bg-transparent pb-[150px] '>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {typingAnswer && renderTypingAnswer(typingAnswer)}
    </div>
  )
}

export default MessageList

import React from 'react'
import styles from '@/styles/loading-dots.module.css'
import LoadingDots from '@/components/ui/LoadingDots'

type Props = {
  isTyping: boolean
}

const TypingIndicator = ({ isTyping }: Props) => {
  if (!isTyping) {
    return null
  }
  return (
    <div className='w-full md:w-[800px] mx-auto text-[lightgray] absolute -top-[38px] flex gap-2 items-center px-4'>
      <div className={`${styles.loadingwheel} items-center flex`}>
        <LoadingDots color='#fff' />
      </div>{' '}
      ChatGPT is typing...
    </div>
  )
}

export default TypingIndicator

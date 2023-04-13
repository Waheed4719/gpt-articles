import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { MessageObjectType } from '@/types'
import MessageAuthor from './MessageAuthor'

type Props = {
  message: MessageObjectType
}

const Message = ({ message }: Props) => {
  return (
    <div key={message.message} className='flex flex-col bg-transparent'>
      {message.sender === 'ChatGPT' ? (
        <div className='flex flex-col p-[20px]'>
          <div className='relative flex gap-3 rounded-xl w-full md:w-[800px] mx-auto mt-1'>
            <MessageAuthor sender='ChatGPT' />
            <div className='text-sm text-white leading-[28px] flex flex-col flex-1 w-[calc(100%-80%)]'>
              {message.message.split('```').map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <p
                      className='mb-4'
                      key={item[0]}
                      dangerouslySetInnerHTML={{
                        __html: item.replace(/\n\n/g, '<br/>'),
                      }}
                    />
                  )
                } else {
                  const delimiter = '\n'

                  const idx = item.indexOf(delimiter)
                  const language = item.substring(0, idx)
                  const formattedLanguage =
                    item.substring(0, idx).charAt(0).toUpperCase() +
                    item.substring(0, idx).slice(1)
                  const code = item.substring(idx + 1)
                  return (
                    <>
                      {formattedLanguage && (
                        <div className='text-white flex items-center justify-between rounded-t-md h-[40px] bg-[#343541] px-[20px] py-2'>
                          <p className='text-sm'>{formattedLanguage}</p>
                          <button
                            type='button'
                            className='hover:text-gray-200 text-sm'
                          >
                            Copy code
                          </button>
                        </div>
                      )}
                      <SyntaxHighlighter
                        key={index}
                        language={language ?? 'javascript'}
                        style={dracula}
                        className=' p-[20px_!important] rounded-b-md'
                      >
                        {code}
                      </SyntaxHighlighter>
                    </>
                  )
                }
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col  p-[20px] bg-[#343541]'>
          <div className='relative flex gap-3 rounded-xl w-full md:w-[800px]  mx-auto mt-1'>
            <MessageAuthor sender='User' />
            <p className='text-sm text-white leading-[28px]'>
              {message.message}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message

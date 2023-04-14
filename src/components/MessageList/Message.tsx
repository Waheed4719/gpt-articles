import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { MessageObjectType } from '@/types'
import MessageAuthor from './MessageAuthor'

type Props = {
  message: MessageObjectType
}

const formatCode = (item: string, index: number) => {
  const delimiter = '\n'

  const idx = item.indexOf(delimiter)
  const language = item.substring(0, idx)
  const formattedLanguage =
    language.substring(0, idx).charAt(0).toUpperCase() +
    language.substring(0, idx).slice(1)
  const code = item.substring(idx + 1)
  return (
    <>
      <div className='text-white flex items-center justify-between rounded-t-md h-[40px] bg-[#343541] px-[20px] py-2'>
        <p className='text-[12px] font-semibold'>
          {formattedLanguage === '' ? 'Unknown language' : formattedLanguage}
        </p>
        <button
          type='button'
          className='hover:text-gray-200 text-[12px] font-semibold flex items-center justify-center gap-2'
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
              d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z'
            />
          </svg>
          Copy code
        </button>
      </div>
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

const Message = ({ message }: Props) => {
  return (
    <div key={message.message} className='flex flex-col bg-transparent'>
      {message.sender === 'ChatGPT' ? (
        <div className='flex flex-col p-[20px]'>
          <div className='relative flex gap-4 rounded-xl w-full md:w-[800px] mx-auto mt-1'>
            <MessageAuthor sender='ChatGPT' />
            <div className='text-sm text-white leading-[28px] flex flex-col flex-1 w-[calc(100%-80%)]'>
              {message.message.split('```').map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <p
                      className='whitespace-pre-wrap'
                      key={item[0]}
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                    />
                  )
                } else {
                  return formatCode(item, index)
                }
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col  p-[20px] bg-[#343541]'>
          <div className='relative flex gap-3 rounded-xl w-full md:w-[800px]  mx-auto mt-1'>
            <MessageAuthor sender='User' />
            <p
              className='mb-4 text-sm text-white leading-[28px] whitespace-pre-wrap'
              dangerouslySetInnerHTML={{
                __html: message.message,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Message

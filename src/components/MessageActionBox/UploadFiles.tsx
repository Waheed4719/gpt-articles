import React, { FormEvent, useState } from 'react'
import Modal from '../Modal'
import { AnimatePresence } from 'framer-motion'

const UploadFiles = () => {
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button
          type='button'
          onClick={() => setShowModal(true)}
          className='absolute left-[10px] flex text-white'
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
              d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
            />
          </svg>
        </button>
      </form>
      <AnimatePresence>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={'Upload Files'}
          size='sm'
        >
          <div>
            <input className='hidden' type='file' name='myFile' />
            <p className='text-white'>Upload File</p>
          </div>
        </Modal>
      </AnimatePresence>
    </>
  )
}

export default UploadFiles

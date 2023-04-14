import React, { FormEvent, useState, useEffect } from 'react'
import pdfjsLib from 'pdfjs-dist'
import Modal from '../Modal'
import { AnimatePresence } from 'framer-motion'

const UploadFiles = () => {
  const [showModal, setShowModal] = useState(false)
  const [pdfText, setPdfText] = useState('')

  useEffect(() => {
    async function fetchData() {
      console.log(pdfjsLib)
      // const text = await loadPdfText()
      // console.log(text)
      // setPdfText(text)
    }
    fetchData()
  }, [])
  async function loadPdfText() {
    // Load the PDF file using pdfjs-dist
    const pdf = await pdfjsLib.getDocument('../../../public/files/resume.pdf')
      .promise

    // Get the number of pages in the PDF file
    const { numPages } = pdf

    // Loop through each page and extract its text
    let text = ''
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item) => item.str).join(' ')
    }

    return text
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('myFile', e.target.elements.myFile.files[0])
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    console.log(response.json())
    // Handle response
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

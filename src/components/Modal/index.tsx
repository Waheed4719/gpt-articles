import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalFooter from './ModalFooter'
import { ModalAnim, FadeInOut } from '../../utils/animations'
import { useEffect, useState, useRef } from 'react'

type ModalProps = {
  title: string
  open: boolean
  onClose?: () => void
  children?: React.ReactNode
  size: 'lg' | 'md' | 'sm'
}

const sizes = {
  xl: 'w-[calc(100vw-30px)] h-[calc(100vh-30px)]',
  lg: 'w-[calc(1000px)] h-[calc(100vh-30px)] max-w-full',
  md: 'w-[600px] max-w-full h-[600px]',
  sm: 'w-[fit-content] h-[fit-content]',
}

const Modal = ({ open, size = 'md', onClose, title, children }: ModalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal')
    setMounted(true)
  }, [])

  const handleModalClose = () => {
    onClose && onClose()
  }
  if (!open) {
    return null
  }
  return (
    <>
      {mounted && ref.current
        ? ReactDOM.createPortal(
            <div className='z-[100] shadow-md fixed h-full w-full flex top-0 left-0'>
              <motion.div
                key='modalOverlay'
                variants={FadeInOut()}
                initial='hidden'
                animate='show'
                exit='hidden'
                aria-label='close modal'
                role='button'
                tabIndex={0}
                className='bg-[rgba(0,0,0,0.6)] fixed top-0 left-0  h-full w-full'
                onClick={handleModalClose}
                onKeyDown={handleModalClose}
              />
              <motion.div
                key='content'
                variants={ModalAnim('100vh')}
                initial='hidden'
                animate='show'
                exit='exit'
                className={`${sizes[size]} min-w-[350px] bg-[#444654] rounded-md m-auto`}
              >
                <ModalHeader title={title} onClose={handleModalClose} />
                <ModalContent>{children}</ModalContent>
                <ModalFooter />
              </motion.div>
            </div>,
            ref.current
          )
        : null}
    </>
  )
}

export default Modal

type ModalHeaderProps = {
  title: string
  onClose: () => void
}
const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className='h-[50px] w-full px-4 py-3 flex justify-between items-center border-b-[1px] border-[rgba(255,255,255,.1)]'>
      <div className='text-white'>{title}</div>
      <div>
        <button
          type='button'
          onClick={onClose}
          className='text-2xl bg-gray-200 hover:bg-gray-300 h-6 w-6 rounded-full items-center justify-center flex'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ModalHeader

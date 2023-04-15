import Link from 'next/link'
interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='mx-auto flex flex-col space-y-4'>
      <header className='w-full sticky top-0 z-40 bg-[#444654]'>
        <div className='h-16  py-4'>
          <nav className='ml-4 pl-6'>
            <Link
              href='/'
              className='text-white hover:text-[rgba(255,255,255,0.8)] cursor-pointer hover:border-b-2 border-white'
            >
              ChatGPT
            </Link>
            <Link
              href='/docu-chat'
              className='text-white ml-4 hover:text-[rgba(255,255,255,0.8)] cursor-pointer hover:border-b-2 border-white'
            >
              DocChat
            </Link>
          </nav>
        </div>
      </header>
      <div>
        <main className='flex w-full flex-1 flex-col overflow-hidden'>
          {children}
        </main>
      </div>
    </div>
  )
}
export default Layout

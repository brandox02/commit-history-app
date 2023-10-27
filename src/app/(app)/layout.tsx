import type { Metadata } from 'next'
import Menu from '@/components/Menu';

export const metadata: Metadata = {
  title: 'Survey App',
  description: 'Survey App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='w-80 h-screen'>
        <Menu />
      </div>
      <div className='h-screen w-full overflow-auto '>
        {children}
      </div>
    </>
  )
}

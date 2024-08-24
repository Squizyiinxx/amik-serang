import React, { Suspense } from 'react'
import Sidebar from '../components/Sidebar'
import { MyDropdown } from '@/components'
import Image from 'next/image'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { dropdownItem } from '@/utils'
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

interface LayoutPageProps {
  children: React.ReactNode
  title: string
}

const LayoutPage = async ({ children, title }: LayoutPageProps) => {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex bg-slate-100 items-start before:absolute before:top-0 before:left-0 before:h-72 before:w-full before:bg-blue-600'>
      <Sidebar title={title} />
      <div className="w-full z-10 px-10 my-4 ms-[260px]">
        <div className="w-full flex items-center justify-between">
          <h1 className='text-white text-lg font-bold uppercase'>{title}</h1>
          <div className="flex gap-6 items-center">
              <Link href={'/'} className={buttonVariants({variant:'secondary'})}>Halaman Website</Link>
            <div className="flex gap-2 items-center">
              <Image src={session?.user?.image || '/logo.png'} width={40} height={40} priority alt='logo' className='rounded-full border border-slate-200 w-[40px] h-[40px] object-cover' />
              <MyDropdown name={session?.user?.name} itemDropdown={dropdownItem} />
            </div>
          </div>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default LayoutPage

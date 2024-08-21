import {Footer,NavbarUser} from '@/components'
import React from 'react'

const UserLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <>
    <NavbarUser title={title} />
    <main>
        {children}
    </main>
    <Footer/>
    </>
  )
}

export default UserLayout
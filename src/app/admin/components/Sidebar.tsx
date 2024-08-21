import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { navLink } from '@/utils'

const Sidebar = ({ title }: { title?: string }) => {
    return (
        <div className="min-w-[260px] fixed h-screen bg-white shadow-lg items-center flex flex-col">
            <div className="flex flex-col w-full items-center justify-center gap-2 py-4 border-b border-slate-200">
                <Image src={'/logo.png'} width={60} priority height={60} alt='logo' />
                <h1 className='text-slate-800 text-sm md:text-base text-sky-700 font-semibold'>Admin Amik</h1>
            </div>
            <ul className='my-14 w-full flex flex-col gap-2'>
                {navLink && navLink.map((item, i) => (

                    <li key={i} className={`${item.name === title ? "text-gray-700 bg-sky-100" : "text-gray-400"} hover:bg-sky-200 hover:text-gray-700 py-2 mx-2 rounded-lg`}>
                        <Link href={item.link} className="flex items-center w-full justify-start px-6 my-1 gap-4">
                            <FontAwesomeIcon icon={item.icon} size='lg' width={14} className='text-sky-600' />
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Sidebar
'use client'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import clsx from 'clsx'

interface MyDropdownProps {
  itemDropdown: any,
  name?: any
}

const MyDropdown: React.FC<MyDropdownProps> = ({ itemDropdown, name }) => {
  const [active, setActive] = useState(false)

  const handleItemClick = (item: any) => {
    if (item.link === 'logout') {
      signOut({
        redirect: true,
        callbackUrl:`${window.location.origin}/api/auth/signin`
      });
    }
  }

  return (
    <div className='flex items-center w-44 gap-6 py-2 px-4 relative text-white cursor-pointer'
      onClick={() => setActive(!active)}
    >
      {name}
      <FontAwesomeIcon icon={active ? faCaretUp : faCaretDown} width={15} />

      <ul className={clsx('flex flex-col gap-2 absolute top-10 left-0 bg-white w-full py-2 rounded-lg shadow-lg transition-all duration-300 ease-out', {
        'dropdown-active': active,
        'dropdown': !active,
      })}
        style={{ display: active ? 'block' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {itemDropdown.map((item: any, i: number) => (
          <li key={i} className='w-full py-1 px-4 text-sm hover:bg-slate-200'>
            {
              item.link === 'logout' ? (
                <div onClick={() => handleItemClick(item)} className='text-gray-700'>{item.name}</div>
              ) : (
                <Link href={item.link} className='text-gray-700'>{item.name}</Link>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyDropdown

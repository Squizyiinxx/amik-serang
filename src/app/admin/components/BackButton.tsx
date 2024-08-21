"use client"
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const BackButton = () => {
  return (
      <button className='bg-slate-100 py-2 px-5 rounded-full block hover:bg-slate-200' onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faAngleLeft} className='w-4 text-slate-500' size='lg' />
      </button>
  )
}

export default BackButton
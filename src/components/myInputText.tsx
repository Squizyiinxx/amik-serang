'use client'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface myInputTextProps {
  type: string,
  placeholder: string
  name: string,
  labelText: string,
  register?: any,
  showPassword?: boolean
  errors: any,
  background?: string;
  readonly?: boolean
  cls?: string,
  action?: () => void
}

const myInputText = ({type, placeholder, name, labelText, register, errors,showPassword, action,background,readonly }: myInputTextProps) => {
 
  return (
    <div className='flex flex-col gap-2 text-white w-full'>
      <label id={name} className='text-slate-500'>{labelText}</label>
      <div className={`${background?background : 'bg-slate-100'} flex shadow justify-between items-center px-4 py-2 rounded-lg text-slate-700 border  border-slate-200`}>
        <input type={type} id={name} name={name} {...register(name)} placeholder={placeholder} className='w-full bg-transparent focus:outline-none' readOnly={readonly} />
        {
          name === 'password' && (
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='text-blue-700 w-4 cursor-pointer' onClick={action} />
          )
        }
      </div>
      {errors[name] && <span className='text-red-500 text-sm'>{errors[name].message}</span>}
    </div>
  )
}

export default myInputText
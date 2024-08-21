"use client"
import { MyInputText } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const MyForm =  () => {
    const [imageSource,setImageSource] = useState('/person.jpeg')
    const formSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: 'Invalid email' }),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters' }),
    })
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

    }
  return (
      <form method='post' onSubmit={handleSubmit(onSubmit)} className='my-10 flex flex-col gap-5'>
          <MyInputText type="text" placeholder="Masukan Nama..." labelText="Fullname" name='name' register={register} errors={errors} />
          <MyInputText type="email" placeholder="Masukan Email..." labelText="Email" name='email' register={register} errors={errors} />
          <MyInputText type="password" placeholder="Masukan Password..." labelText="Password" name='password' register={register} errors={errors} />
          <button type='submit' className='bg-yellow-500 py-2 text-white px-5 rounded-lg shadow block hover:bg-yellow-600 w-[100px]'>Simpan</button>
      </form>
  )
}

export default MyForm
import { quickLink, sosmed } from '@/lib'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='text-white bg-[#002c4a] w-full'>
            <div className="max-w-8xl mx-auto items-center justify-center gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 mt-10 px-4">
                <div className="px-5 w-full">
                    <div className='flex justify-center flex-col '>
                        <Image src={'/logo.png'} width={150} height={150} priority alt='logo' className='w-[150px] h-[150px] object-cover' />
                        <h1 className='text-2xl mb-4 font-bold uppercase'>Kampus Amik Serang</h1>
                        <p className='text-start'>Jl. KH Abdul Fatah Hasan No.32 <br /> Sumurpecung Kec. Serang <br /> Kota Serang, Banten 42118</p>
                    </div>
                    <div className='mt-4'>
                        <p className='text-white flex gap-2 items-center mb-2'>
                            <FontAwesomeIcon icon={faEnvelope} size='lg' className='w-4' /> amikhumas@gmail.com
                        </p>
                        <p className='text-white flex gap-2 items-center'>
                            <FontAwesomeIcon icon={faPhone} size='lg' className='w-4' /> 0254-202486 / +6287763673123
                        </p>
                    </div>
                    <div className="flex gap-2 mt-5 items-center">
                        {
                            sosmed.map((item, i) => (
                                <Link href={item.url} key={i} className='rounded-full bg-slate-100 p-2 hover:bg-sky-400 transition duration-300 '>
                                    <Image src={item.icon} width={20} height={20} alt={item.name} loading='lazy' className='w-[20px] h-[20px]' />
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center w-full flex-col items-center px-4 md:px-0">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0709882772417!2d106.16981357498949!3d-6.121147693865504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41f5251004f1c7%3A0x7881750ed8139d7d!2sAkademi%20Manajemen%20Informatika%20Dan%20Komputer%20Serang!5e0!3m2!1sen!2sid!4v1723893513734!5m2!1sen!2sid" className='w-full md:w-[400px] h-[300px] border-0' 
                        allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
                </div>
                <div className="px-5 w-full flex flex-col gap-5 xl:flex-row justify-center items-center">
                    <div className='flex flex-col justify-center items-start w-full'>
                        <h1 className='text-2xl font-bold mb-4'>Quick Link</h1>
                        <ul>
                            {
                                quickLink.map((item, index) => (
                                    <li key={index}><Link href={item.url} className='hover:text-sky-600 transition duration-300'>{item.title}</Link></li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <h1 className='text-2xl font-bold mb-4'>Pendaftaran Mahasiswa Baru</h1>
                        <p>Untuk Pendaftaran Mahasiswa Baru dapat melalui WA: 087763673123 <br />atau melalui</p>
                        <a href='http://bit.ly/daftaramikserang' className='text-slate-100 active:text-sky-600 hover:text-sky-600 transition duration-300'>http://bit.ly/daftaramikserang</a>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center py-5 text-slate-100 bg-slate-800">
                <p className='text-xs sm:text-sm md:text-base'>Copyright © 2024 Kampus Amik Serang. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface Props {
    data: {
        id: string;
        Judul: string;
        created_at: string;
        content: string;
        picture: string
        user: {
            name: string
        }
        kategori: {
            nama: string
        }
    }
}
const NewsItem = ({ data }: Props) => {
    return (
        <div className="flex flex-col items-center px-4 mt-4">
            <Link href={'/berita/' + data.id}>
                <Image src={data?.picture}
                    quality={50}
                    priority
                    width={250}
                    height={150}
                    alt='news image'
                    className='rounded-lg shadow-md border border-slate-200 w-full h-[250px] object-cover hover:scale-105 transition duration-500 hover:opacity-80' />
                <h1 className='text-lg cursor-pointer hover:text-slate-500 transition duration-300 sm:text-2xl pt-2 text-center font-bold pb-2 text-start'>{data?.Judul}</h1>
            </Link>
            <div className="flex items-center text-xs sm:text-sm text-slate-400 gap-3 mb-2">
                <p>Date: {new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Jakarta',
                    hour12: false,
                }).format(new Date(data?.created_at))}</p>
                <p>Penulis: {data?.user?.name}</p>
            </div>
            <p className='text-start text-sm sm:text-base text-slate-500 truncate-lines'>
                {data?.content}
            </p>
        </div>
    )
}

export default NewsItem
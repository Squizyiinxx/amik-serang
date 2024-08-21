import UserLayout from '@/app/userLayout'
import { NewsComponent } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchNewsById, fetchNewsByLimit } from '@/utils/fetchUser';
import Image from 'next/image';
import React, { Suspense } from 'react'

interface detailProps {
    params: {
        id: string;
    }
}

const DetailNews = async ({ params }: detailProps) => {
    const title = 'Berita';
    const { id } = params;
    const data = await fetchNewsById(id);
    const newsByLimit = await fetchNewsByLimit();

    const paragraphs = data?.content
            .split('.')
            .reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                const trimmedSentence = sentence.trim();

                if (trimmedSentence.endsWith('"') || trimmedSentence.includes(',"')) {
                    acc.push((acc.pop() || '') + trimmedSentence + '.');
                } else {
                    acc.push(trimmedSentence + (index !== array.length - 1 ? '.' : ''));
                }
                return acc;
            }, [])
            .map((paragraph: string, index: number) => (
                <p key={index} className="mt-4 text-slate-600">
                    {paragraph}
                </p>
            ));

    return (
        <UserLayout title={title}>
            <div className="max-w-6xl px-4 mt-20 mx-auto">
                <div className="flex flex-col justify-center items-center">
                    <h1 className='font-bold md:text-3xl xl:text-4xl leading-7 text-2xl text-slate-700 uppercase text-center'>{data?.Judul}</h1>
                    <div className="flex justify-between w-full items-center mt-10 md:px-10">
                        <div className="flex justify-center items-center gap-2">
                            <Image
                                src={`${data?.user?.image}`}
                                alt="person"
                                width={50}
                                height={50}
                                className='rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover' />
                            <div className="flex flex-col justify-center gap-1">
                                <p className='text-slate-800 font-bold'>{data?.user?.name}</p>
                                <p className='text-slate-500 text-xs sm:text-sm'>
                                    {new Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Jakarta',
                                        hour12: false,
                                    }).format(new Date(data?.created_at))}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-center text-xs sm:text-sm md:text-base bg-slate-200 py-2 px-6 md:px-8 rounded-full font-bold">
                                Artikel
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:px-10">
                        <Image
                            src={`/uploads/${data?.picture}`}
                            alt="news"
                            priority
                            width={800}
                            height={800}
                            className='rounded-lg mt-4 w-full h-[300px] md:h-[500px] object-cover shadow-md'
                        />
                    </div>
                    <Suspense fallback={<Skeleton />}>
                        <div className="mt-10 text-slate-600 px-4 md:px-10">{paragraphs}</div>
                    </Suspense>
                </div>
            </div>
            <NewsComponent newsData={newsByLimit} title={'Home'} />
        </UserLayout>
    )
}

export default DetailNews;

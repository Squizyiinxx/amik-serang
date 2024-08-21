import React from 'react';
import NewsItem from './NewsItem';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
    newsData: any[];
    title: string;
    category?: any[];
}

const NewsComponent: React.FC<Props> = ({ newsData, title, category }) => {
    const hasNews = newsData.length > 0;

    return (
        <div className='w-full flex justify-center items-center py-8'>
            <div className="max-w-7xl px-2 sm:px-4 md:px-8 py-10 block rounded-lg shadow-lg bg-white w-full">
                <h1 className='text-3xl mt-1 text-center font-bold border-b-2 border-slate-100 py-2 md:text-start'>BERITA</h1>
                {title === 'Berita' && (<div className='flex my-4 gap-3 w-full items-center overflow-x-scroll md:overflow-x-auto py-3'>
                    {
                        category?.map((item) => (
                            <div key={item.id}>
                                {
                                    item.nama === 'Semua' ? (
                                        <Link href='/berita' className='text-center group flex items-center gap-3 text-slate-800 hover:bg-slate-400 bg-slate-300/50 rounded-lg px-6 py-2 transition duration-300 text-sm'>
                                            <span>{item.nama}</span>
                                        </Link>

                                    ) : (
                                        <Link href={`/berita?category=${item.id}`} className='text-center group flex items-center gap-3 text-slate-800 hover:bg-slate-400 bg-slate-300/50 rounded-lg px-6 py-2 transition duration-300 text-sm'>
                                            <span>{item.nama}</span>
                                        </Link>

                                    )
                                }
                            </div>
                        ))
                    }
                </div>)
                }
                <div className={`grid ${!hasNews ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} mt-4 gap-6`}>
                    {!hasNews ? (
                        <h1 className='text-center font-bold text-base md:text-lg w-full'>-- Data Kosong -- </h1>
                    ) : (
                        <>
                            {newsData.map((newsItem) => (
                                <NewsItem key={newsItem.id} data={newsItem} />
                            ))}
                        </>
                    )}
                </div>
                <div className="flex justify-end w-full pt-8 px-4">
                    {title === 'Home' && (
                        <Link href='/berita' className='text-center group flex items-center gap-3 text-slate-800 font-bold hover:text-slate-500'>
                            Lihat semua berita <FontAwesomeIcon icon={faAngleRight} className='w-4 text-slate-800 hover:transform group-hover:translate-x-2 transition duration-500 group-hover:text-slate-500' size='lg' />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsComponent;

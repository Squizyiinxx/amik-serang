import React from 'react'
import LayoutPage from '../layouts/LayoutPage'
import { DataTables } from '../components/DataTables'
import {buttonVariants } from '@/components/ui/button'
import Link from 'next/link'


const News = () => {
    const title = 'News'
    return (
        <LayoutPage title={title}>
            <div className="py-20">
                <div className="rounded-2xl p-5 shadow bg-white">
                    <h1 className='font-semibold text-slate-700 text-lg py-4'>Data Table News</h1>
                    <Link href={'/admin/news/create'} className={buttonVariants({variant:'default'})}><span className='text-lg font-bold mr-1'>+</span> News</Link>
                   <DataTables/>
                </div>
            </div>
        </LayoutPage>
    )
}

export default News
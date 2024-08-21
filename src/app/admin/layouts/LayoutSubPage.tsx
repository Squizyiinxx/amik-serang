import React, { Suspense } from 'react'
import Sidebar from '../components/Sidebar'
import BackButton from '../components/BackButton';

interface LayoutPageProfileProps {
    children: React.ReactNode;
    title: string;
    jk?: string
}
const LayoutSubPage = ({ children,title,jk }: LayoutPageProfileProps) => {
    return (
        <div className='flex'>
            <Sidebar title={jk}/> 
            <div className='w-full ms-[260px]'>
                <div className="flex bg-blue-600 justify-between items-center py-6 px-4 border-b-2 border-slate-100">
                    <div className="flex items-center justify-center gap-4">
                        <BackButton />
                        <h1 className='text-2xl text-white font-bold'>{title}</h1>
                    </div>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                {children}
                </Suspense>
            </div>
        </div>
    )
}

export default LayoutSubPage
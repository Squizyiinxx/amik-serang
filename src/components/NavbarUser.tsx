import { navLinkUser } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Skeleton } from './ui/skeleton';

const linkClasses = 'relative font-light hover:text-sky-500 transition-all duration-300 after:content-[""] after:block after:h-[2px] after:bg-sky-400 after:absolute after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300 after:rounded-lg after:mx-auto';

const activeClasses = 'text-sky-500 after:w-full';

interface Props {
    title: string;
}

const DropdownUser =(({ title }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='md:hidden mx-2'>
                <Button className="h-10 w-10 p-3 bg-white rounded" aria-label="Open menu">
                    <FontAwesomeIcon icon={faBars} className="text-blue-500" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='md:hidden'>
                {navLinkUser.map((item, index) => (
                    <DropdownMenuItem key={index}>
                        <Link
                            href={item.link}
                            className={`${linkClasses} ${title === item.name ? activeClasses : 'text-slate-500'} capitalize text-base`}>
                            {item.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

const Navigation = (({ title }: Props) => {
    return (
        <ul className='gap-4 text-white items-center w-full hidden md:flex'>
            {navLinkUser.map((item, index) => (
                <li key={index}>
                    <Link
                        href={item.link}
                        className={`${linkClasses} ${title === item.name ? activeClasses : 'text-slate-100'} uppercase text-base`}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
});

const NavbarUser: React.FC<Props> = ({ title }) => {
    return (
        <div className='flex items-center bg-[#002c4a] px-2 md:px-8 justify-between md:gap-8 py-2'>
            <div className="flex items-center w-[75%] gap-1">
                <Image src="/logo.png" width={60} height={60} priority alt='logo' className='w-[60px] h-[60px] object-cover' />
                <h1 className='text-red-400 leading-4 md:leading-5 text-sm md:text-lg font-bold text-stroke-text'>AMIK SERANG</h1>
            </div>
            <DropdownUser title={title} />
            <Suspense fallback={<Skeleton className='w-full' />}>
                <Navigation title={title} />
            </Suspense>
        </div>
    );
};

export default NavbarUser;

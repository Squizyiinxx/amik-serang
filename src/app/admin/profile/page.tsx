'use client'
import React, { useState } from 'react';
import LayoutSubPage from '../layouts/LayoutSubPage';
import Image from 'next/image';
import { MyInputText } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const Profile = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { data: session } = useSession();
    const data = session?.user;
    const formSchema = z.object({
        password: z.string()
            .min(1, { message: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters' }),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: 'Password updated successfully',
                timer: 1500,
                showConfirmButton: false,
            });
            window.location.reload();
        } else {
            const data = await response.json();
            Swal.fire({
                icon: "error",
                title: `Error: ${data.message}`,
                timer: 1500,
                showConfirmButton: false,
            });
            window.location.reload();
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <LayoutSubPage title="Profile">
            <div className='flex gap-6 p-6 w-full'>
                <div className="flex justify-center gap-4 md:justify-start p-6 shadow rounded-lg border border-slate-200 w-full">
                    <div className="w-52">
                        <Image src={data?.image || '/person.jpeg'} width={200} height={200} alt='logo' className='rounded-full border border-slate-200 object-cover w-[200px] h-[200px]' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className='font-bold text-2xl'>Profile</h1>
                        <h2 className='text-slate-500 text-xl'>{data?.name}</h2>
                        <h3 className='text-slate-400'>{data?.email}</h3>
                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            <MyInputText type={showPassword ? 'text' : 'password'} placeholder="Masukan Password..." name="password" labelText="Password" register={register} errors={errors} showPassword={showPassword} action={handleShowPassword} />
                            <button type="submit" className="mt-4 p-2 bg-yellow-500 text-white rounded">Ubah Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutSubPage>
    );
}

export default Profile;

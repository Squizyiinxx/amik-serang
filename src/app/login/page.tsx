'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import InputLogin from './InputLogin';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import Loading from './loading';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/admin/dashboard');
        }
    }, [status, router]);

    const formSchema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string()
            .min(6, { message: 'Password must be at least 6 characters' }),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const loginData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        setLoading(false);

        if (loginData?.error) {
            toast({
                title: 'Login Failed',
                description: loginData.error || 'Oops! Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } else {
            router.push('/admin/dashboard');
        }
    };

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className='bg-gray-800 h-screen py-10'>
            {loading && <Loading cls='h-screen w-full fixed top-0 left-0 z-50 bg-gray-600 opacity-50' />}
            <div className="flex flex-col items-center justify-center gap-4 mx-auto mt-20 w-full px-5 md:px-0 md:w-96">
                <Image src='/logo.png' alt='logo amik' width={100} height={30} />
                <div className="flex flex-col gap-4 items-center justify-center w-full rounded-lg border-2 border-white py-10 px-6">
                    <h1 className='text-white text-lg md:text-2xl font-bold'>Login Admin</h1>
                    <p className='text-white text-xs'>Please Login To Admin Dashboard</p>
                    <form method='post' className='flex flex-col gap-6 w-full' onSubmit={handleSubmit(onSubmit)}>
                        <InputLogin
                            name='email'
                            type='email'
                            placeholder='Email'
                            icon={faEnvelope}
                            register={register}
                            errors={errors}
                        />
                        <InputLogin
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            icon={showPassword ? faEyeSlash : faEye}
                            register={register}
                            errors={errors}
                            action={togglePasswordVisibility}
                        />
                        <button type='submit' className='w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg text-sm md:text-base'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

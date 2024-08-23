'use client';

import React, { useEffect, useState } from 'react';
import LayoutSubPage from '../../layouts/LayoutSubPage';
import { MyInputText } from '@/components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';
import { MySelect } from '@/components/MySelect';
import UploadImage from '../../components/UploadImage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import MyBreadCrumb from '../../components/MyBreadCrumb';


const formSchema = z.object({
    Judul: z.string().min(1, { message: 'Judul is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    kategoriId: z.string().min(1, { message: 'Kategori ID is required' }),
    userId: z.string().min(1, { message: 'User ID is required' }),
    picture: z.any().optional(),
});

const Loading = dynamic(() => import('./loading'), { ssr: false });

const AddNews = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<{ id: string; nama: string }[]>([]);
    const data = session?.user;

    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Judul: '',
            content: '',
            kategoriId: '',
            userId: data?.name || '',
            picture: {},
        },
    });

    const { setValue, handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        if (data?.name) {
            setValue('userId', data.name);
        }
    }, [data, setValue]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                toast({
                    title: 'Failed to add news',
                    description: error as string,
                    variant: 'destructive',
                });
            }
        };

        fetchCategories();
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const { Judul, content, kategoriId, picture } = values;
        const formData = new FormData();
        formData.append('Judul', Judul);
        formData.append('content', content);
        formData.append('kategoriId', kategoriId ? categories.find((c) => c.nama === kategoriId)?.id || '0' : '0');
        formData.append('userId', data?.id || '0');
        if (picture instanceof File) {
            formData.append('picture', picture);
        }

        try {
            const res = await fetch('/api/news', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                toast({
                    title: 'Failed to add news',
                    description: 'Please try again later',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: 'News added successfully',
                description: 'News has been added successfully',
            });
            router.push('/admin/news');
        } catch (error) {
            toast({
                title: 'Failed to add news',
                description: error as string,
                variant: 'destructive',
            });
        }finally {
            setIsLoading(false);
        }
    };
    const url = [{ name: 'news', url: '/admin/news' }, { name: 'create', url: '/admin/news/create' }];

    return (
        <LayoutSubPage title="Add News" jk='News'>
            <div className="flex px-8 pt-3 pb-1">
            <MyBreadCrumb url={url}/>
            </div>
            {isLoading && <Loading cls='h-screen w-full fixed top-0 left-0 z-50 bg-gray-600 opacity-50' />}
            <div className="py-6 px-8">
                <h1 className='font-semibold text-slate-700 text-xl mb-4'>Tambah Berita</h1>
                <p className='text-slate-500 text-sm'>
                    Lengkapi Formulir Ini untuk Menambah Berita yang Relevan dan Menarik
                </p>
                <FormProvider {...methods}>
                    <form method="post" className='w-full py-8 px-16' onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center gap-4 py-4">
                            <MyInputText type="text" placeholder="Masukan Judul..." labelText="Judul" name='Judul' register={methods.register} errors={errors} background='bg-white' />
                            <MyInputText type="text" placeholder="Masukan Writer..." labelText="Writer" name='userId' register={methods.register} errors={errors} readonly />
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="select" className='text-slate-500'>Category</label>
                                {categories.length === 0 ? (
                                    <Skeleton className="w-[180px] h-[50px] rounded-lg" />

                                ) : (
                                    <MySelect name="kategoriId" setValue={setValue} categories={categories} />
                                )}
                            </div>
                        </div>
                        <label htmlFor="content" className='text-slate-500'>Content</label>
                        <Textarea placeholder="Type your content here." {...methods.register('content')} id="content" className='mt-2' />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                        <UploadImage name="picture" label="Upload Image" />
                        <Button type="submit" variant={'default'} className='mt-6 px-5'>Submit</Button>
                    </form>
                </FormProvider>
            </div>
        </LayoutSubPage>
    );
};

export default AddNews;

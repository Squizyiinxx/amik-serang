'use client';

import React, { useEffect, useState } from 'react';
import LayoutSubPage from '@/app/admin/layouts/LayoutSubPage';
import { MyInputText } from '@/components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';
import { MySelect } from '@/components/MySelect';
import UploadImage from '@/app/admin/components/UploadImage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import MyBreadCrumb from '@/app/admin/components/MyBreadCrumb';

const formSchema = z.object({
    Judul: z.string().min(1, { message: 'Judul is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    kategoriId: z.string().min(1, { message: 'Kategori ID is required' }),
    userId: z.string().min(1, { message: 'User ID is required' }),
    picture: z.any().optional(),
});

const Loading = dynamic(() => import('./loading'), { ssr: false });

interface EditPageProps {
    params: {
        id: string;
    };
}

const fetchNewsDetail = async (id: string) => {
    const res = await fetch(`/api/news/${id}`);
    return res.json();
};

const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    return res.json();
};

const EditPage: React.FC<EditPageProps> = ({ params }) => {
    const { id } = params;
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<{ id: string; nama: string }[]>([]);
    const [news, setNews] = useState<any>(null);

    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Judul: '',
            content: '',
            kategoriId: '',
            userId: session?.user?.name || '',
            picture: {},
        },
    });

    const { setValue, handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        const initializeData = async () => {
            const [newsData, categoriesData] = await Promise.all([
                fetchNewsDetail(id),
                fetchCategories()
            ]);

            setNews(newsData);
            setCategories(categoriesData);

            setValue('Judul', newsData.Judul);
            setValue('content', newsData.content);
            setValue('kategoriId', newsData.kategoriId);
            setValue('picture', newsData.picture);
            setValue('userId', session?.user?.name || '');
        };

        initializeData();
    }, [id, session?.user?.name, setValue]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('Judul', values.Judul);
        formData.append('content', values.content);
        formData.append('kategoriId', categories.find(c => c.nama === values.kategoriId)?.id || '0');
        formData.append('userId', session?.user?.id || '0');

        if (values.picture instanceof File) {
            formData.append('picture', values.picture);
        }

        try {
            const res = await fetch('/api/news/'+ id, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to add news');

            toast({
                title: 'News update successfully',
                description: 'News has been update successfully',
            });
            router.push('/admin/news');
        } catch (error) {
            toast({
                title: 'Failed',
                description: 'Failed to update news',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
    const url = [{ name: 'news', url: '/admin/news' }, { name: 'edit', url: '/admin/news/edit' }];
    return (
        <LayoutSubPage title="Edit News" jk='News'>
            <div className="px-8 pt-4 pb-1">
                <MyBreadCrumb url={url} id={id}/>
            </div>
            {isLoading && <Loading cls='h-screen w-full fixed top-0 left-0 z-50 bg-gray-600 opacity-50' />}
            <div className="py-6 px-8">
                <h1 className='font-semibold text-slate-700 text-xl mb-4'>Edit Berita</h1>
                <p className='text-slate-500 text-sm'>
                    Lengkapi Formulir Ini untuk Mengedit Berita yang Relevan dan Menarik
                </p>
                <FormProvider {...methods}>
                    <form method="post" className='w-full py-8 px-16' onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center gap-4 py-4">
                            {news ? (
                                <>
                                    <MyInputText type="text" placeholder="Masukan Judul..." labelText="Judul" name='Judul' register={methods.register} errors={errors} background='bg-white' />
                                    <MyInputText type="text" placeholder="Masukan Writer..." labelText="Writer" name='userId' register={methods.register} errors={errors} readonly />
                                </>
                            ) : (
                                <>
                                    <Skeleton className="w-[180px] h-[50px] rounded-lg" />
                                    <Skeleton className="w-[180px] h-[50px] rounded-lg" />
                                </>
                            )}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="select" className='text-slate-500'>Category</label>
                                {categories.length ? (
                                    <MySelect name="kategoriId" setValue={setValue} categories={categories} value={news?.kategori?.nama} />
                                ) : (
                                    <Skeleton className="w-[180px] h-[50px] rounded-lg" />
                                )}
                            </div>
                        </div>
                        <label htmlFor="content" className='text-slate-500'>Content</label>
                        {news ? (
                            <>
                                <Textarea placeholder="Type your content here." {...methods.register('content')} id="content" className='mt-2' />
                                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                            </>
                        ) : (
                            <Skeleton className="w-full h-[100px] rounded-lg" />
                        )}
                        <UploadImage name="picture" label="Upload Image" value={news?.picture} />
                        <Button type="submit" variant={'default'} className='mt-6 px-5'>Submit</Button>
                    </form>
                </FormProvider>
            </div>
        </LayoutSubPage>
    );
};

export default EditPage;

'use client';

import React, { useEffect, useState } from 'react';
import LayoutSubPage from '../layouts/LayoutSubPage';
import { MyInputText } from '@/components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import dynamic from 'next/dynamic';
import MyBreadCrumb from '../components/MyBreadCrumb';
import Swal from 'sweetalert2';

const formSchema = z.object({
    date: z.string().min(1, { message: 'Date is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
});

const Loading = dynamic(() => import('./loading'), { ssr: false });

const Announcement = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [dataAnnouncement, setAnnouncement] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '',
            title: '',
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/announcement`);
                const data = await res.json();
                setAnnouncement(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const { setValue, handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const { date, title } = values;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('date', date);

        try {
            const url = editMode ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/announcement/${editId}` : '/api/announcement';
            const method = editMode ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                body: formData,
            });

            if (!res.ok) {
                toast({
                    title: 'Failed to save Announcement',
                    description: 'Please try again later',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: editMode ? 'Announcement updated successfully' : 'Announcement added successfully',
                description: 'Announcement has been saved successfully',
            });

            setEditMode(false);
            setEditId(null);
            router.push('/admin/announcement');
            window.location.reload();
        } catch (error) {
            toast({
                title: 'Failed to save Announcement',
                description: error as string,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () =>{
        setEditMode(false);
        setValue('title', '');
        setValue('date', '');
    }

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Do you want to delete it?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/announcement/${id}`, {
                        method: 'DELETE',
                    });

                    if (!res.ok) {
                        toast({
                            title: 'Failed to delete Announcement',
                            description: 'Please try again later',
                            variant: 'destructive',
                        });
                        return;
                    }
                    Swal.fire("Deleted!", "", "success");
                    window.location.reload();
                } catch (error) {
                    toast({
                        title: 'Failed to delete Announcement',
                        description: (error as Error).message,
                        variant: 'destructive',
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    const handleEdit = (id: string, date: any, title: string) => {
        setEditMode(true);
        setEditId(id);
        setValue('date', new Date(date).toISOString().slice(0, 10));
        console.log(date)
        setValue('title', title);
    };

    const url = [{ name: 'Announcement', url: '/admin/announcement' }, { name: editMode ? 'Edit' : 'Create', url: '/admin/announcement/create' }];

    return (
        <LayoutSubPage title="Add Announcement" jk='Announcement'>
            <div className="flex px-8 pt-3 pb-1 shadow">
                <MyBreadCrumb url={url} />
            </div>
            <div className='p-5'>
                <div className='w-full shadow'>
                    {isLoading && <Loading key={'loading'} cls='h-screen w-full fixed top-0 left-0 z-50 bg-gray-600 opacity-50' />}
                    <div className="py-6 px-8">
                        <h1 className='font-semibold text-slate-700 text-xl mb-4'>{editMode ? 'Edit Announcement' : 'Add Announcement'}</h1>
                        <FormProvider {...methods}>
                            <form method="post" className='w-full py-8' onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex justify-between items-center gap-4 py-4">
                                    <MyInputText type="date" placeholder="Enter Date..." labelText="Date" name='date' register={methods.register} errors={errors} background='bg-white' />
                                    <MyInputText type="text" placeholder="Enter Title..." labelText="Title" name='title' register={methods.register} errors={errors} background='bg-white' />
                                    <Button type="submit" className={`mt-6 px-5 ${editMode && 'bg-green-500'}`}>{editMode ? 'Update' : 'Submit'}</Button>
                                </div>
                                {
                                    editMode && (<Button className='my-3' type='button' onClick={handleAdd}>Tambah Data</Button>)
                                }
                            </form>
                        </FormProvider>
                        <table className='w-full border border-slate-200'>
                            <thead>
                                <tr>
                                    <th className='p-4 border border-slate-200'>No</th>
                                    <th className='p-4 border border-slate-200'>Date</th>
                                    <th className='p-4 border border-slate-200'>Title</th>
                                    <th className='p-4 border border-slate-200'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataAnnouncement?.map((data: any, i: number) => (
                                        <tr key={data.id}>
                                            <td className='p-4 border border-slate-200'>{i + 1}</td>
                                            <td className='p-4 border border-slate-200'>{new Intl.DateTimeFormat('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                timeZone: 'Asia/Jakarta',
                                                hour12: false,
                                            }).format(new Date(data?.date))}</td>
                                            <td className='p-4 border border-slate-200 w-3/4'>{data?.title}</td>
                                            <td className='p-4 border border-slate-200 flex gap-5'>
                                                <button className='bg-green-500 text-white py-2 px-5 rounded hover:bg-green-700' onClick={() => handleEdit(data?.id, data?.date, data?.title)}>Edit</button>
                                                <button className='bg-red-500 text-white py-2 px-5 rounded hover:bg-red-700' onClick={() => handleDelete(data?.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutSubPage>
    );
};

export default Announcement;

import LayoutSubPage from '@/app/admin/layouts/LayoutSubPage';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Loading from './loading';
import MyBreadCrumb from '@/app/admin/components/MyBreadCrumb';

interface detailProps {
  params: {
    id: string;
  };
}

const fetchNewsDetail = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/news/${id}`, { cache: 'no-store' });
  const data = await res.json();

  if (data) {
    const date = new Date(data.created_at);
    data.created_at = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
      hour12: false,
    }).format(date);
  }

  return data;
};

const NewsDetailContent = async ({ id }: { id: string }) => {
  const data = await fetchNewsDetail(id);

  return (
    <>
      <div className="flex flex-col px-6 pb-8 pt-2 items-center">
        <div className="flex p-3 items-start w-full">
        </div>
        <div className="w-full p-4 items-start flex flex-col">
          <p className="font-bold">{data?.created_at} WIB</p>
          <div className="flex gap-4 items-center">
            <Image
              src={`/uploads${data?.user?.image}`}
              width={40}
              height={40}
              className="rounded-full border border-slate-200 w-[40px] h-[40px] object-cover"
              alt="user"
              loading="lazy"
            />
            <div className="my-2">
              <p className="text-slate-700 font-bold">{data.user.name}</p>
              <p className="text-slate-500 text-sm mt-1">penulis</p>
            </div>
          </div>
          <p className="rounded-full shadow text-center text-slate-700 bg-slate-200 py-2 px-6 text-sm mt-4">
            {data.kategori.nama}
          </p>
        </div>
        <div className="w-[500px] py-5">
          <Image
            src={`/uploads/${data.picture}`}
            className="rounded-lg shadow w-full h-[300px] object-cover"
            priority
            width={500}
            height={300}
            alt={`picture ${data.title}`}
          />
        </div>
        <h1 className="md:text-2xl font-bold">{data.Judul}</h1>
        <p className="text-slate-500 text-sm md:text-base mt-5">{data.content}</p>
      </div>
    </>
  );
};

const DetailPage = ({ params }: detailProps) => {
  const { id } = params;
  const title = 'Detail News';
  const url = [{name:'news', url: '/admin/news'}, {name:'detail', url: '/admin/news/detail'}];

  return (
    <LayoutSubPage title={title} jk="News">
      <div className="px-4 pt-2">
        <MyBreadCrumb url={url} id={id} />
      </div>
      <Suspense fallback={<Loading />}>
        <NewsDetailContent id={id} />
      </Suspense>
    </LayoutSubPage>
  );
};

export default DetailPage;

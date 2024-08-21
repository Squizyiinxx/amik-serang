import NewsComponent from '@/components/NewsComponent';
import React, { Suspense } from 'react';
import UserLayout from '../userLayout';
import { fetchCategory, fetchNewsByCategory, fetchNewsAll } from '@/utils/fetchUser';
import { Skeleton } from '@/components/ui/skeleton';

const BeritaUser = async ({ searchParams }: { searchParams: { category?: string } }) => {
  const categoryId = searchParams.category;
  const news = categoryId ? await fetchNewsByCategory(categoryId) : await fetchNewsAll();
  const category = await fetchCategory();
  const all = { id: 1, nama: 'Semua' };
  const categories = category.length > 0 ? [all, ...category] : category;
  const title = "Berita";

  return (
    <UserLayout title={title}>
      <Suspense fallback={<Skeleton className='w-full h-full' />}>
      <NewsComponent newsData={news} title={title} category={categories} />
      </Suspense>
    </UserLayout>
  );
};

export default BeritaUser;

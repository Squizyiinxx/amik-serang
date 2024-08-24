import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { jalurDaftar, pengumuman } from '@/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import UserLayout from './userLayout';
import { fetchNewsByLimit } from '@/utils/fetchUser';

const NewsComponent = dynamic(() => import('@/components/NewsComponent'), {
  suspense: true,
});

export default async function Home() {
  const title = 'Home';
  const newsData = await fetchNewsByLimit();

  return (
    <UserLayout title={title}>
      <div className="relative w-full h-screen">
        <Image
          priority
          src="/jumbotron.webp"
          sizes="(max-width: 640px) 100vw, 
         (max-width: 768px) 75vw, 
         50vw"
          layout="fill"
          objectFit="cover"
          alt="Jumbotron"
          className="w-full h-full object-cover"
          quality={75}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-slate-800 to-slate-700/50 z-2"></span>
        <div className="flex flex-col items-center mt-8 md:mt-12 absolute top-0 left-0 w-full px-2">
          <Image src="/logo.png" alt="Logo" priority width={150} height={150} className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] z-3" />
          <h1 className="text-lg md:text-3xl text-center font-bold z-3 text-red-500 text-stroke-text">AKADEMI MANAJEMEN INFORMATIKA DAN KOMPUTER <br />SERANG</h1>
          <h2 className="text-xl md:text-2xl mt-4 text-center font-bold z-3 text-yellow-400">JAWARANYA INFORMATIKA</h2>
          <p className="text-center text-sm md:text-base px-2 md:px-0 text-slate-200 mt-4 w-full md:w-3/4">Amik Serang, berdiri sejak 1995, dengan berbekalan Ilmu Manajemen Informatika telah mencetak para pemimpin, pengusaha yang tersebar di penjuru dunia, <br /> Ayo Awali Langkah Menuju Era Society 5.0 🌟 Daftar sekarang di AMIK Serang TA 2024/2025 dan jadilah bagian dari IT Sesungguhnya. Prosesnya mudah, cepat, dan bisa jadi awal baru untuk meraih impianmu!</p>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdEx4PI21utm0N0X4Kt9dmSLCMG3ZXTnRX_xo87fC0w-Tixpg/viewform" className="relative mt-6 bg-yellow-500 text-white px-4 md:px-6 text-sm md:text-base py-2 rounded-lg transition overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[#002c4a] after:w-full after:h-0 after:opacity-0 hover:after:h-full hover:after:opacity-100 outline-none hover:shadow-md after:transition-all after:duration-300">
            <span className="relative z-10">Daftar Sekarang</span>
          </Link>
        </div>
      </div>
      <Suspense fallback={<Skeleton className='w-full' />}>
        <NewsComponent newsData={newsData} title='Home' />
      </Suspense>
      <section id="jalurDaftar" className="flex justify-center items-center w-full bg-[#002c4a]">
        <div className="flex flex-col md:flex-row items-center w-full px-4 max-w-7xl py-10">
          <div className="w-full flex justify-center md:justify-start items-center mb-5">
            <Image src="/pmb1.jpg" loading="lazy" width={500} height={500} alt="PMB" className="w-[500px] rounded-lg shadow" />
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-white text-lg sm:text-2xl font-bold mb-5 border-b-2 pb-1 border-yellow-500 uppercase tracking-wider">Jalur Pendaftaran</h1>
            <p className="text-slate-200 text-center text-xs sm:text-sm">Langkah Awal Menuju Era Society 5.0 🌟 Daftar sekarang di AMIK Serang TA 2024/2025 dan jadilah bagian dari IT Sesungguhnya. Prosesnya mudah, cepat, dan bisa jadi awal baru untuk meraih impianmu! Swipe left untuk lihat alur registrasinya dan jangan lewatkan kesempatan ini.</p>
            <div className="flex flex-col gap-5 px-6 mt-5">
              {jalurDaftar.map((item, i) => (
                <div className="relative rounded-xl border bg-slate-100 py-4 border-slate-200 w-full" key={i}>
                  <span className="absolute -top-2 -left-3 rounded-full text-slate-100 bg-yellow-500 px-2">{item?.id}</span>
                  <h1 className="text-slate-800 text-center text-base sm:text-lg font-bold px-4 mb-2">{item?.title}</h1>
                  <ul className="list-disc list-inside px-4">
                    {item.content.map((content, index) => (
                      <li className="text-slate-500 text-xs sm:text-sm text-pretty" key={index}>{content}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="pengumuman" className="max-w-7xl mx-auto py-8 mt-4">
        <h1 className="text-2xl text-center md:text-start sm:text-3xl font-bold border-b-2 border-slate-100 py-2 md:text-start uppercase">Pengumuman</h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 justify-center gap-4 md:flex-row mx-auto">
          {pengumuman.map((item, i) => (
            <div className={`${item.color} w-full text-slate-100 px-8 py-4 shadow-lg rounded-lg`} key={i}>
              <div className="flex flex-col justify-between min-h-[200px]">
                <div className="cursor-default">
                  <h1 className="text-white text-xl font-bold mb-2 border-b pb-2 border-slate-600">{item.date}</h1>
                  <h2 className="text-slate-200 text-lg md:text-xl lg:text-2xl">{item.title}</h2>
                </div>
                <Link href="#">
                  <span className="text-center group flex items-center gap-3 text-slate-100 font-bold hover:text-slate-300 transition-all duration-500">
                    Selengkapnya <FontAwesomeIcon icon={faAngleRight} className="w-4 text-slate-100 hover:transform group-hover:translate-x-2 transition-all duration-500 group-hover:text-slate-300" size="lg" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </UserLayout>
  );
}

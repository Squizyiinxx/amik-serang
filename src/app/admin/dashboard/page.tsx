
import React from 'react';
import LayoutPage from '../layouts/LayoutPage';
import Image from 'next/image';


const DashboardPage = () => {

  const title = 'Dashboard'
  return (
    <LayoutPage title={title}>
      <div className="py-20">
        <div className="rounded-2xl p-5 shadow bg-white flex flex-col items-center justify-center px-10">
          <h2 className='text-lg py-4 md:text-2xl font-semibold text-slate-700'>VISI</h2>
          <p className='text-center'>Menjadi program studi manajemen informasi yang unggul dan handal yang berbudaya saling di provinsi Banten pada tahun 2025 dengan kemampuan technopreneurship</p>
          <h2 className='text-lg py-4 md:text-2xl font-semibold text-slate-700'>MISi</h2>
          <p className='text-center mb-2'>Misi dari program studi manajemen informatika AMIK Serang adalah:</p>
          <ol className='list-decimal'>
            <li> Menyelenggarakan pendidikan manajemen informatika yang sesuai dengan sistem pendidikan nasional dan kebutuhan pasar kerja di Provinsi Banten </li>
            <li> Menyiapkan lulusan yang mamapu dalam manajemen membuat aplikasi berbasis web, pemrograman serta desain grafis dan multimedia</li>
            <li > Menyiapkan mahasiswa yang menjadi lulusan yang dapat bersaing di era teknologi informasi</li>
            <li>  Menyelenggarakan pengabdian masyarakat yang kontruktif dan bermanfaat bagi stakeholder</li>
          </ol>
          <h2 className='text-lg py-4 md:text-2xl font-semibold text-slate-700'>Struktur Organisasi</h2>
          <Image loading='lazy' src={'/struktur.png'} alt="struktur" width={500} height={500} className='mt-10 w-auto h-auto' />
        </div>
      </div>
    </LayoutPage>
  );
};

export default DashboardPage;
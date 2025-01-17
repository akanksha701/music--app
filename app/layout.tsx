import './globals.css';
import { Tooltip } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/Redux/storeProvider';
import NavbarPage from './Navbar/index';
// import Footer from './Footer/Footer';
import MusicPlayerContainer from './Music/UI/UtilityComponent/MusicPlayerContainer';
// import { Nunito } from 'next/font/google';
import { Suspense } from 'react';
// const nunito = Nunito({
//   subsets: ['latin'],
//   weight: ['300', '400', '600', '700'],
// });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  // const res = await fetch('http://localhost:3000/api/marketing');
  // const data = await res.json();

  return (
    <ReduxProvider>
      <html lang="en">
        <body className={'min-h-screen flex flex-col'}>
          <Toaster position="top-center" />
          <Tooltip />
          <Suspense fallback={<></>}>
            <NavbarPage />
            <main className="flex-grow">{children}</main>
            <MusicPlayerContainer />
            {/* <Footer data={data?.footerContent} /> */}
          </Suspense>
        </body>
      </html>
    </ReduxProvider>
  );
}

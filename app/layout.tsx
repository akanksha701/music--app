import './globals.css';
import { Tooltip } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/Redux/storeProvider';
import NavbarPage from './Navbar/index';
import Footer from './Footer/Footer';
import MusicPlayerContainer from './Music/UI/UtilityComponent/MusicPlayerContainer';
import { Suspense } from 'react';
import Loading from './(ProfilePage)/Album/loading';
import Modal from '@/common/modal/Modal';
async function fetchFooterData() {
  try {
    const res = await fetch(`${process.env.APP_URL}/api/marketing`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    return res.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await fetchFooterData();
  
  return (
    <ReduxProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Toaster position="top-center" />
          <Tooltip />
          <Suspense fallback={<Loading />}>
            <NavbarPage />
            {/* <Modal title="My Modal Title" body="This is the content of the modal.">
              <button >Open Modal2</button>
            </Modal> */}
            {/* <Modal/> */}
            <main className="flex-grow">{children}</main>
            <MusicPlayerContainer />
            {footerData ? <Footer data={footerData?.footerContent} /> : <></>}
          </Suspense>
        </body>
      </html>
    </ReduxProvider>
  );
}

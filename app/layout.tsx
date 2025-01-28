import './globals.css';
import { Tooltip } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/Redux/storeProvider';
import NavbarPage from './Navbar/index';
import Footer from './Footer/Footer';
import MusicPlayerContainer from './Music/UI/UtilityComponent/MusicPlayerContainer';
import { Suspense } from 'react';
import Loading from './(ProfilePage)/Album/loading';

async function fetchFooterData() {
  try {
    const res = await fetch(`${process.env.APP_URL}/api/marketing`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    return res.json();
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
        <body className="bg-gray-100 text-gray-900">
          <Toaster position="top-center" />
          <Tooltip />
          <div className="flex flex-col min-h-screen">
            <header className="sticky mx-20 top-0 z-50">
              <NavbarPage />
            </header>
            <main className="flex flex-col min-h-screen">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-gray-800">
              <MusicPlayerContainer />
            </div>

            {footerData ? (
              <footer className="bg-gray-200">
                <Footer data={footerData?.footerContent} />
              </footer>
            ) : null}
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}

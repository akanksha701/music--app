import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/Redux/storeProvider';
import NavbarPage from './Navbar/index';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang='en'>
          <body>
            <Toaster position='top-center' />
            <NavbarPage />
            <NextUIProvider>{children}</NextUIProvider>
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>

  );
}

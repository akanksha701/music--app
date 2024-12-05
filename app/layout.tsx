import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NextUIProvider, Tooltip } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Redux/storeProvider";
import NavbarPage from "./Navbar/index";
import { ThemeProvider } from "next-themes";
import Footer from "./Footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import Modal from "@/common/modal/modal";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch("http://localhost:3000/api/marketing");
  const data = await res.json();

  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en">
          <body className="min-h-screen flex flex-col">
            <Toaster position="top-center" />
            <Tooltip />
            <Modal/>
            <Suspense fallback={<Loading />}>
              <NavbarPage />
              <main className="flex-grow">{children}</main>
              <Footer data={data?.footerContent} />
            </Suspense>
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}

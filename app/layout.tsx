import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Redux/storeProvider";
import NavbarPage from "./Navbar/index";
import { ThemeProvider } from "next-themes";
import Footer from "./Footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";
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
            <Suspense fallback={<Loading/>}>
              <NavbarPage />
              <NextUIProvider>{children}</NextUIProvider>
              <Footer data={data?.footerContent} />
            </Suspense>
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}

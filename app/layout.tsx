import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Redux/storeProvider";
import NavbarPage from "./Navbar/index";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReduxProvider>
          <html lang="en">
            <body>
        <ThemeProvider attribute="class">

              <Toaster position="top-center" />
              <NavbarPage />
              <NextUIProvider>{children}</NextUIProvider>
        </ThemeProvider>

            </body>
          </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}

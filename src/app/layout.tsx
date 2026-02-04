
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cairo } from 'next/font/google'
import './globals.css';
import ReduxProvider from "./ReduxProvider";
import Script from 'next/script'
// const myFont = LocalFont({ src: "../../public/fonts/SomarSans-Regular.ttf" });

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function RootLayout({
  children,
  // params: { locale }
}: {
  children: React.ReactNode;
  // params: Promise<{ locale: string }>;
}) {
  return (
    <html lang="en" className={cairo.className} suppressHydrationWarning>
      {/* <html lang={locale} className={cairo.className}> */}
      <head>
      </head>
      <body suppressHydrationWarning>
        {/* <body dir={locale === 'ar' ? "rtl" : "ltr"}> */}
        <ReduxProvider>
          {children}
          <ToastContainer position="bottom-right" />
        </ReduxProvider>
      </body>
    </html>
  )
}

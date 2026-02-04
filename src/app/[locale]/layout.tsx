import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientLayoutWrapper from "../_components/ClientLayoutWrapper";
import Navbar from "../_components/Navbar";
import NewFooter from "../_components/NewFooter";
import NewHeader from "../_components/NewHeader";

export const metadata = {
  title: "Atlas",
  description: "Atlas International Medical Complex"
};
export default async function LocaleLayout({
  children,
  // params,
  // params: { locale },
}: {
  children: React.ReactNode;
  // params: Promise<{ locale: string }>;
  // params: { locale: string };
}) {
  
  // const { locale } = await params;
  // const messages = await getMessages({ locale});
  const messages = await getMessages({ locale: "en" });
  return (
    <div dir={"ltr"}>
    {/* <div dir={locale === "ar" ? "rtl" : "ltr"}> */}
      <NextIntlClientProvider messages={messages}>
        {/* <Navbar />
        <NewHeader /> */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        {/* <NewFooter /> */}
      </NextIntlClientProvider>
    </div>
  );
}

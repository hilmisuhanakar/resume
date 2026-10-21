import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {getMessages} from "next-intl/server";
import "@/app/globals.css";
import ActiveSectionProvider from "@/components/site/active-section-provider"
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hilmi Sühan Akar",
  description: "Portfolio of Hilmi Sühan Akar",
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth motion-reduce:scroll-auto`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          
          <ActiveSectionProvider>
            {children}
          </ActiveSectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

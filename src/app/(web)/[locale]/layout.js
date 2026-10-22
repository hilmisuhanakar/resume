import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {getMessages} from "next-intl/server";
import "@/app/globals.css";
import ActiveSectionProvider from "@/components/site/active-section-provider"
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  const isTurkish = locale === "tr";

  const canonicalUrl = isTurkish
      ? BASE_URL
      : `${BASE_URL}/${locale}`;

  return {
      metadataBase: new URL(BASE_URL),
      authors: [{ name: "Hilmi Sühan Akar",  url: `${BASE_URL}/${locale}` }],
      creator: "Hilmi Sühan Akar",
      publisher: "Hilmi Sühan Akar",
      keywords: ["Hilmi Sühan Akar", "Full-Stack Software Developer", "C#", ".NET", "Next.js", "PostgreSQL", "Software Developer", "Software Engineer", "Software Architect", "Antalya", "Freelancer", "Freelance Software Developer"],
      applicationName: "Hilmi Sühan Akar",
      
      title: messages.Metadata.title,
      description: messages.Metadata.description,

      alternates: {
          canonical: canonicalUrl,

          languages: {
              "tr-TR": BASE_URL,
              "en-US": `${BASE_URL}/en`,
              "x-default": BASE_URL,
          },
      },

      openGraph: {
          type: "profile",
          locale: isTurkish ? "tr_TR" : "en_US",
          alternateLocale: isTurkish ? ["en_US"] : ["tr_TR"],
          url: canonicalUrl,
          siteName: "Hilmi Sühan Akar",
          title: messages.Metadata.title,
          description: messages.Metadata.description,
      },

      twitter: {
          card: "summary_large_image",
          title: messages.Metadata.title,
          description: messages.Metadata.description,
      },

      robots: {
          index: true,
          follow: true,
          googleBot: {
              index: true,
              follow: true,
              "max-image-preview": "large",
              "max-snippet": -1,
              "max-video-preview": -1,
          },
      },
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
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

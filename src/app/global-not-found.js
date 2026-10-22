import "./globals.css";
import { ArrowLeftIcon } from "lucide-react";

export const metadata = {
    title: "404 | Hilmi Sühan Akar",
    description: "Aradığınız sayfa bulunamadı. / The page you are looking for does not exist.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function GlobalNotFound() {
    return (
        <html lang="tr">
            <body>
                <main className="flex flex-col items-center justify-center h-screen gap-3 text-primary text-center px-5">
                    <h1 className="text-5xl font-semibold tracking-[3px]">404</h1>
                    <p>Aradığınız sayfa bulunamadı.</p>
                    <p>The page you are looking for does not exist.</p>
                    <div className="flex gap-6 mt-4">
                        <a href="/" className="flex items-center gap-2 hover:underline">
                            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                            Ana sayfaya dön
                        </a>
                        <a href="/en" className="flex items-center gap-2 hover:underline">
                            <ArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
                            Back to home
                        </a>
                    </div>
                </main>
            </body>
        </html>
    );
}

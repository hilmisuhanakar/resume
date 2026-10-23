import { createOgImage } from "@/lib/og-image";

export const alt = "Hilmi Sühan Akar - Full-Stack Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
    const { locale } = await params;
    return createOgImage(locale);
}

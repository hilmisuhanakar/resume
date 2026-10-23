import "server-only";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

export async function createOgImage(locale) {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    const [name, title] = messages.Metadata.title.split("|").map((part) => part.trim());
    const photo = await readFile(path.join(process.cwd(), "public", "me.png"));
    const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 80px",
                    background: "#292929",
                    color: "#ffffff",
                    borderBottom: "12px solid #CEF549",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 650 }}>
                    <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: 2 }}>{name}</div>
                    <div style={{ width: 80, height: 6, background: "#CEF549", margin: "28px 0" }} />
                    <div style={{ fontSize: 38, color: "#d4d4d4" }}>{title}</div>
                    <div style={{ fontSize: 26, color: "#CEF549", marginTop: 36 }}>
                        {new URL(process.env.NEXT_PUBLIC_BASE_URL).host}
                    </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={photoSrc}
                    width={360}
                    height={360}
                    alt={name}
                    style={{ borderRadius: 360, border: "8px solid #CEF549", objectFit: "cover" }}
                />
            </div>
        ),
        { ...ogSize }
    );
}

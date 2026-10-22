"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function Turnstile({ locale = 'tr', onVerify }) {
    const [lang] = useState(locale);
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);

    function renderTurnstile() {
        if (!window.turnstile || !containerRef.current || widgetIdRef.current !== null) {
            return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current,
            {
                sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
                language: lang,
                callback: (token) => {
                    onVerify(token);
                },

                "expired-callback": () => {
                    onVerify("");
                },

                "error-callback": () => {
                    onVerify("");
                },
            }
        );
    }

    useEffect(() => {
        renderTurnstile();

        return () => {
            if (window.turnstile && widgetIdRef.current !== null) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        }

    }, [lang]);

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
                onLoad={renderTurnstile}
            />

            <div ref={containerRef} />
        </>
    );
}
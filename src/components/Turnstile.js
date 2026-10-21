"use client";

import Script from "next/script";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

export default function Turnstile({ onVerify }) {
    const locale = useLocale();
    const containerRef = useRef(null);
    const widgetIdRef = useRef(null);

    function renderTurnstile() {
        if (!window.turnstile || !containerRef.current || widgetIdRef.current !== null) {
            return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current,
            {
                sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
                language: locale,
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
        if (window.turnstile && widgetIdRef.current !== null) {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
        }

        renderTurnstile();

        return () => {
            if (window.turnstile && widgetIdRef.current !== null) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [locale]);

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
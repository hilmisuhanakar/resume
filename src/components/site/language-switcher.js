"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const languages = [
    { code: "tr", label: "🇹🇷 TR", href: "/" },
    { code: "en", label: "🇬🇧 EN", href: "/en" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const current = languages.find((language) => language.code === locale) ?? languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative text-white">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Language"
                className="flex items-center gap-2 rounded-sm px-3 py-1 bg-primary hover:cursor-pointer"
            >
                <span>{current.label}</span>
                <FaChevronDown className={`text-[12px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <ul
                role="listbox"
                className={`absolute left-0 top-full mt-1 min-w-full z-10 bg-primary border border-[#CEF549] rounded-sm overflow-hidden ${isOpen ? "block" : "hidden"}`}
            >
                {languages.map((language) => {
                    const isActive = language.code === locale;
                    return (
                        <li key={language.code} role="option" aria-selected={isActive}>
                            <Link
                                href={language.href}
                                hrefLang={language.code}
                                lang={language.code}
                                scroll={false}
                                onClick={() => setIsOpen(false)}
                                aria-current={isActive ? "true" : undefined}
                                className={`block px-3 py-2 whitespace-nowrap hover:bg-white/10`}
                            >
                                {language.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
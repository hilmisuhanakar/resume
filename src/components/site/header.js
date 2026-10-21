"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowUp, FaDownload } from "react-icons/fa";
import LanguageSwitcher from "./language-switcher";
import DownloadMenu from "./download-menu";
export default function Header({ activeId }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpenDownload, setIsOpenDownload] = useState(false);
    const t = useTranslations("Navigation");
    const menuItems = [
        {
            label: "experience",
            href: "#deneyim",
        },
        {
            label: "education",
            href: "#egitim",
        },
        {
            label: "skills",
            href: "#yetenekler",
        },
        {
            label: "contact",
            href: "#iletisim",
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <>
            <header className="sticky top-0 w-full z-1">
                {/* desktop */}
                <nav className="hidden lg:flex justify-between items-center py-7 px-20 bg-primary  shadow-xs shadow-[#CEF549] ">
                    <h3 className="lg:text-[30px] text-white">Hilmi Sühan Akar</h3>
                    <div className="flex items-center gap-6">
                        {menuItems.map((item, index) => (
                            <Link href={item.href} key={index}>
                                <h3
                                    className={`text-[16px] text-white transition-colors ${item.href === `#${activeId}` ? "underline underline-offset-4 decoration-[#CEF549]" : ""}
                                        }`}
                                >
                                    {t(item.label)}
                                </h3>
                            </Link>
                        ))}
                        <LanguageSwitcher />
                        <DownloadMenu isOpenDownload={isOpenDownload} setIsOpenDownload={setIsOpenDownload} />
                    </div>
                </nav>
                {/* mobile */}
                <nav className="lg:hidden flex top-0 z-1 justify-between items-center py-8 px-5 bg-primary shadow-xs shadow-[#CEF549] ">
                    <h3 className="text-[21px] text-white">Hilmi Sühan Akar</h3>
                    <div className="flex items-center justify-end gap-6">
                        <div className="flex items-center gap-7">
                            <DownloadMenu isOpenDownload={isOpenDownload} setIsOpenDownload={setIsOpenDownload} />

                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`top-5 right-5 text-white border border-[#CEF549] rounded-full p-2 bg-primary ${isMenuOpen ? 'bg-gray-600/70 z-3' : ''}`}>
                                <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Üst çizgi */}
                                    <line
                                        className={`origin-center transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                                        style={{ transformBox: 'fill-box' }}
                                        x1="3"
                                        y1="12"
                                        x2="21"
                                        y2="12"
                                    />

                                    {/* Orta çizgi */}
                                    <line
                                        className={`transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
                                        x1="3"
                                        y1="12"
                                        x2="21"
                                        y2="12"
                                    />

                                    {/* Alt çizgi */}
                                    <line
                                        className={`origin-center transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                                        style={{ transformBox: 'fill-box' }}
                                        x1="3"
                                        y1="12"
                                        x2="21"
                                        y2="12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className={`absolute py-20 top-0 left-0 w-full h-screen bg-primary flex flex-col items-center gap-3 transition-transform duration-700 ease-in-out ${isMenuOpen ? "translate-x-0 z-2" : "-translate-x-full"}`}>
                            {menuItems.map((item, index) => (
                                <Link href={item.href} key={index} onClick={() => setIsMenuOpen(false)}>
                                    <h3
                                        className={`text-[16px] transition-colors ${item.href === `#${activeId}` ? "text-[#CEF549]" : "text-white"
                                            }`}
                                    >
                                        {t(item.label)}
                                    </h3>
                                </Link>
                            ))}
                            <LanguageSwitcher />
                        </div>
                    </div>
                </nav>
            </header>

            <div className="fixed z-11 bottom-5 right-5 bg-transparent flex items-center justify-end text-primary">
                {!isScrolled ?
                    <svg width="50" height="60" viewBox="0 0 24 40" fill="none" xmlns="http://w3.org">
                        <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="10" r="2" fill="currentColor">
                            <animate attributeName="cy" values="8;16;8" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                    :
                    <FaArrowUp onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="border border-[#CEF549] rounded-full p-2 bg-primary text-gray-100 text-[50px] hover:cursor-pointer hover:scale-105 transition-all duration-300" />
                }
            </div >
        </>
    );
}
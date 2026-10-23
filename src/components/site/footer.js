
import Link from "next/link";
import {  Mail, ArrowUp } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import CurrentYear from "./current-year";

export default async function Footer({ locale, meData }) {
    const t = await getTranslations("Footer");

    const navigation = [
        { name: t("experience"), href: "#deneyim" },
        { name: t("education"), href: "#egitim" },
        { name: t("skills"), href: "#yetenekler" },
        { name: t("contact"), href: "#iletisim" },
    ];

    return (
        <footer className="border-t border-white/10 bg-[#111827] text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                <div className="grid gap-10 md:grid-cols-3">

                    {/* Profile */}
                    <div>
                        <Link
                            href={`/${locale}`}
                            className="text-xl font-bold text-white"
                        >
                            {meData.name}
                        </Link>

                        <p className="mt-2 text-sm text-gray-400">
                            {meData.title}
                        </p>

                        <div className="mt-5 flex items-center gap-4">

                            {meData.github && (
                                <a
                                    href={meData.github}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    aria-label="GitHub"
                                    className="transition-colors hover:text-white"
                                >
                                    <FaGithub size={20} />
                                </a>
                            )}

                            {meData.linkedin && (
                                <a
                                    href={meData.linkedin}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="transition-colors hover:text-white"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                            )}

                            {meData.email && (
                                <a
                                    href={`mailto:${meData.email}`}
                                    aria-label={t("email")}
                                    className="transition-colors hover:text-white"
                                >
                                    <Mail size={20} />
                                </a>
                            )}

                        </div>
                    </div>

                    {/* Navigation */}
                    <nav aria-label={t("navigation")}>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                            {t("navigation")}
                        </h2>

                        <ul className="mt-4 space-y-3 text-sm">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* About */}
                    <div className="md:text-right">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                            {t("title")}
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-gray-400">
                            {t("description")}
                        </p>

                        <a
                            href="#"
                            aria-label={t("backToTop")}
                            className="mt-5 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {t("backToTop")}
                            <ArrowUp size={16} />
                        </a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © <CurrentYear /> {meData.name}. {t("rights")}
                    </p>

                </div>

            </div>
        </footer>
    );
}
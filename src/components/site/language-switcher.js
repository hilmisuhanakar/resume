"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();
    return (
        <div>
            <select className="appearance-none text-white" value={locale} onChange={(e) => router.push(`/${e.target.value}`, { scroll: false })}>
                <option value="tr">🇹🇷 TR</option>
                <option value="en">🇬🇧 EN</option>
            </select>
        </div>
    )
}
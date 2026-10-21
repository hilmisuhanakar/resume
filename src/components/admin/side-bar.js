"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    User,
    BriefcaseBusiness,
    GraduationCap,
    FolderKanban,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
    X,
    ToolCase,
    Mail
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Profil",
        href: "/admin/profile",
        icon: User,
    },
    {
        title: "Deneyimler",
        href: "/admin/experience",
        icon: BriefcaseBusiness,
    },
    {
        title: "Eğitim",
        href: "/admin/education",
        icon: GraduationCap,
    },
    {
        title: "Yetenekler",
        href: "/admin/skills",
        icon: ToolCase,
    },
    {
        title: "Projeler",
        href: "/admin/projects",
        icon: FolderKanban,
    },
    {
        title: "İletişim",
        href: "/admin/contact",
        icon: Mail,
    },
    {
        title: "Ayarlar",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminSidebar({ collapsedProp, setCollapsedProp, mobileOpenMenu, setMobileOpenMenu }) {
    const pathname = usePathname();
    const page = '/admin/' + pathname.split('/')[2];
    return (
        <>
            <aside className={`fixed z-20 top-0 left-0 h-screen flex flex-col border-r border-slate-800 transition-all duration-300 bg-slate-950 ${collapsedProp ? `w-16 -translate-x-full` : `w-60 `}  md:translate-x-0 ${mobileOpenMenu ? `translate-x-0` : `-translate-x-full`}`}>
                <div className="flex h-16 items-center justify-between border-b border-slate-800 px-3">
                    <a href="/" className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 bg-[#bbf452] text-black font-bold items-center justify-center rounded-sm">CV</span>
                        {collapsedProp ? null : <span className="text-sm text-white font-bold text-center">Admin Panel</span>}
                    </a>
                    <X onClick={() => setMobileOpenMenu(!mobileOpenMenu)} className="block absolute md:hidden right-4 text-white hover:bg-amber-50 hover:rounded-sm hover:cursor-pointer hover:text-gray-400 transition-all duration-300" size={24} />
                </div>
                <nav className="hidden md:block flex-1 flex-col space-y-1 py-3 px-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href} className={`flex items-center px-3 py-3 gap-3 hover:bg-slate-800 hover:text-white transition-all duration-300 ${page === item.href ? `bg-[#bbf452] text-black` : 'text-gray-300'}`}>
                            <item.icon />
                            {collapsedProp ? null : <span className={`text-sm font-bold`}>{item.title}</span>}
                        </Link>
                    ))}
                </nav>
                <nav className="block md:hidden flex-1 flex-col space-y-1 py-3 px-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setMobileOpenMenu(!mobileOpenMenu)} className={`flex items-center px-3 py-3 gap-3 hover:bg-slate-800 hover:text-white transition-all duration-300 ${page === item.href ? `bg-[#bbf452] text-black` : 'text-gray-300'}`}>
                            <item.icon />
                            {collapsedProp ? null : <span className={`text-sm font-bold`}>{item.title}</span>}
                        </Link>
                    ))}
                </nav>
                <div className="hidden border-t border-slate-800 md:block">
                    <button onClick={() => setCollapsedProp(!collapsedProp)} className="w-full flex items-center justify-start gap-2 px-4 py-5 hover:cursor-pointer hover:bg-slate-800 transition-all duration-300">
                        {collapsedProp ? <PanelLeftOpen className="text-gray-400" /> : <PanelLeftClose className="text-gray-400" />}
                    </button>
                </div>
            </aside>
        </>
    );
}
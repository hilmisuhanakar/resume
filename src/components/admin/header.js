"use client";

import { logout } from "@/server/actions/auth.action";
import {
    Bell,
    Menu,
    Search,
    ChevronDown,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminHeader({ collapsedProp, setCollapsedProp, session, mobileOpenMenu, setMobileOpenMenu }) {
    const [sessionMenuOpen, setSessionMenuOpen] = useState(false);

    const name = session?.name;
    const parts = name?.trim().split(/\s+/);
    const initials = `${parts?.[0]?.[0]}${parts?.[parts?.length - 1]?.[0]}`;
    const quit = () => {
        logout();
    }

    return (
        <>
            <div className={`sticky z-1 top-0 w-full duration-300  bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4`}>
                <div className="hidden md:block">
                    <h3 className="text-lg font-bold">Admin Panel</h3>
                    <span className="text-sm text-gray-500">CV içerik yönetimi</span>
                </div>
                <div className="block md:hidden">
                    <Menu className="text-black hover:cursor-pointer hover:text-gray-400 transition-all duration-300" size={24} onClick={() => { setMobileOpenMenu(!mobileOpenMenu) }} />
                </div>
                <div onClick={() => setSessionMenuOpen(!sessionMenuOpen)} className="flex gap-2 bg-black text-white rounded-sm items-center justify-center p-2 hover:cursor-pointer hover:text-gray-400 transition-all duration-300">
                    <p className="text-sm font-bold text-[#bbf452]">{initials}</p>
                    <ChevronDown className={`text-white bg-black transition-all duration-300 ${sessionMenuOpen ? `rotate-180` : ``}`} size={24} />
                    <div className={`absolute right-2 bg-black text-white mt-4 flex flex-col gap-2 top-10 w-48 shadow-md rounded-sm p-4 ${sessionMenuOpen ? `block` : `hidden`}`}>
                        <Link href="/admin/contact">İletişim</Link>
                        <Link href="/admin/profile">Profil</Link>
                        <button
                            onClick={quit}
                            className="flex gap-2 items-center justify-center text-red-500 hover:cursor-pointer hover:text-red-700 transition-all duration-300 border-t  border-gray-500 p-2">
                            <LogOut size={22} />
                            Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
}
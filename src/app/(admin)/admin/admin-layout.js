"use client";
import { useState } from "react";
import AdminSideBar from "@/components/admin/side-bar";
import AdminHeader from "@/components/admin/header";
import "../../globals.css"

export default function AdminLayout({ children, session }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpenMenu, setMobileOpenMenu] = useState(false);

    return (
        <>
            <div className=" bg-slate-50">
                <AdminSideBar collapsedProp={collapsed} setCollapsedProp={setCollapsed} mobileOpenMenu={mobileOpenMenu} setMobileOpenMenu={setMobileOpenMenu}></AdminSideBar>
            </div>
            <div className={`transition-[margin] duration-300 ${collapsed ? `md:ml-16` : `md:ml-60`}`}>
                <AdminHeader collapsedProp={collapsed} setCollapsedProp={setCollapsed} session={session} mobileOpenMenu={mobileOpenMenu} setMobileOpenMenu={setMobileOpenMenu}></AdminHeader>
                <main className="p-5 min-h-[calc(100vh-64px)] w-full">
                    {children}
                </main>
            </div>
        </>
    );
}
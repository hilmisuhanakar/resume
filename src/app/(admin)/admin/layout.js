import AdminLayout from "./admin-layout";
import { getSession } from "@/lib/session";
import Auth from "./auth/page";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
    title: "Admin Panel",
    description: "Admin Panel",
}

export default async function Layout({ children }) {
    return (
        <html>
            <body>
                <Suspense fallback={<Loading />}>
                    <AuthenticatedLayout>
                        {children}
                    </AuthenticatedLayout>
                </Suspense>
            </body>
        </html>
    );
}

async function AuthenticatedLayout({ children }) {
    const session = await getSession();
    return (
        <div>
            {session ? <AdminLayout session={session}>{children}</AdminLayout> : <Auth />}
        </div>
    );
}
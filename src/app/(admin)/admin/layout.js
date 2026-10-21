import AdminLayout from "./admin-layout";
import { getSession } from "@/lib/session";
import Auth from "./auth/page";

export const metadata = {
    title: "Admin Panel",
    description: "Admin Panel",
}

export default async function Layout({ children }) {
    const session = await getSession();
    return (
        <html>
            <body>
                {session
                    ?
                    <AdminLayout session={session}>{children}</AdminLayout>
                    :
                    <Auth />
                    }
            </body>
        </html>
    );
}
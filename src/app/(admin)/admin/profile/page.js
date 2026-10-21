import ProfileData from "@/components/admin/profile-data";
import { getSession, requireSession } from "@/lib/session";
import { getProfileServices } from "@/server/service/profileService";

export default async function ProfilePage() {
    const session = await requireSession();
    const initialData = await getProfileServices();
    return (
        <div>
            <ProfileData initialData={initialData} session={session} />
        </div>
    );
}
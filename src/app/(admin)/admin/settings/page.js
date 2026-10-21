import SettingData from "@/components/admin/setting-data";
import { requireSession } from "@/lib/session";

export default async function SettingsPage() {
    const session = await requireSession();
    return (
        <div>
            <SettingData session={session} />
        </div>
    );
}
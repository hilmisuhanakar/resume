import EducationData from "@/components/admin/education-data";
import { getLanguagesAction } from "@/server/actions/language.action";
import { getEducationsService } from "@/server/service/educationService";
import { requireSession } from "@/lib/session";

export default async function EducationPage() {
    const session = await requireSession();
    const languages = await getLanguagesAction();
    const initialData = await getEducationsService();
    return (
        <div>
            <EducationData initialData={initialData} languages={languages} />
        </div>
    );
}
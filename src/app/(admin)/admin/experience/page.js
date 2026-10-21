import ExperienceData from "@/components/admin/experince-data";
import { getLanguagesAction } from "@/server/actions/language.action";
import { getExperiencesService } from "@/server/service/experienceService";
import { requireSession } from "@/lib/session";

export default async function ExperiencePage() {
    const session = await requireSession();
    const initialData = await getExperiencesService();
    const languages = await getLanguagesAction();
    return (
        <ExperienceData initialData={initialData} languages={languages}/>
    );
}
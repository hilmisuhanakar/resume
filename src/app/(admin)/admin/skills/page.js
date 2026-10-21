import { SkillData } from "@/components/admin/skill-data";
import { getSkillsService } from "@/server/service/skillService";
import { requireSession } from "@/lib/session";

export default async function SkillsPage() {
    const session = await requireSession();
    const skills = await getSkillsService();
    return (
        <SkillData initialData={skills} />
    )
}
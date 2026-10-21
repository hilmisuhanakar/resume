import { getEducationsByLanguageIdAction } from "@/server/actions/education.action";
import TimeLine from "./time-line";

export default async function Education({locale}) {
    const education = await getEducationsByLanguageIdAction(locale);
    return (
        <TimeLine data={education} title="education" elementId="egitim" locale={locale} />
    );
}
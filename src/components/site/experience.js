import { getExperienceByLocaleAction } from "@/server/actions/experience.action";
import TimeLine from "./time-line";

export default async function Experience({locale}) {
    const experiences = await getExperienceByLocaleAction(locale);
    return (

        <TimeLine data={experiences} title="experience" elementId="deneyim" locale={locale} />
    );
}
import SlideIn from "./slide-in"
import { getTranslations } from "next-intl/server";
import { getSkillsAction } from "@/server/actions/skill.action";

export default async function Skills({locale, skills = []}) {
    const t = await getTranslations("PageTitles");
    return (
        <>
            <section id="yetenekler" className="scroll-mt-27 lg:scroll-mt-25.25 overflow-clip">
                <div className="flex flex-col items-center justify-center bg-primary">
                    <div className="w-full min-h-px bg-[#CEF549]"></div>
                    <h2 className="text-2xl py-10 font-bold text-white">{t("skills")}</h2>
                    <div className="w-full min-h-px bg-[#CEF549]"></div>
                    <div className="relative mx-auto py-10">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                            {skills.map((skill, index) => (
                                <li key={skill.id}>
                                    <SlideIn direction={index % 2 === 0 ? "left" : "right"}>
                                        <p className=" bg-white/10 inset-0 min-h-10 min-w-screen md:min-w-96  lg:min-w-125 p-4 text-lg font-bold text-white text-center  hover:text-black hover:bg-[#CEF549] ">{skill.name}</p>
                                    </SlideIn>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

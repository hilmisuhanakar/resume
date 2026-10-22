import SlideIn from "./slide-in"
import { getTranslations } from "next-intl/server";
import { getSkillsAction } from "@/server/actions/skill.action";

export default async function Skills({locale}) {
    const t = await getTranslations("PageTitles");
    const skills = await getSkillsAction();
    return (
        <>
            <section id="yetenekler" className="scroll-mt-27 lg:scroll-mt-25.25 overflow-clip">
                <div className="hidden md:flex flex-col items-center justify-center bg-primary">
                    <div className="w-full min-h-px bg-[#CEF549]"></div>
                    <h2 className="text-2xl py-10 font-bold text-white">{t("skills")}</h2>
                    <div className="w-full min-h-px bg-[#CEF549]"></div>
                    <div className="relative mx-auto py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                            {skills.map((skill, index) => (
                                <SlideIn key={skill.id} direction={index % 2 === 0 ? "left" : "right"}>
                                    <p className=" bg-white/10 inset-0 min-h-10 min-w-screen md:min-w-96  lg:min-w-125 p-4 text-lg font-bold text-white text-center  hover:text-black hover:bg-[#CEF549] ">{skill.name}</p>
                                </SlideIn>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:hidden flex flex-col items-center justify-center bg-primary">
                    <div className="w-screen min-h-px bg-[#CEF549]"></div>
                    <h2 className="text-2xl py-10 font-bold text-white">{t("skills")}</h2>
                    <div className="w-screen min-h-px bg-[#CEF549]"></div>
                    <div className="relative mx-auto py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                            {skills.map((skill, index) => (
                                <SlideIn key={skill.id} direction="up">
                                    <p className=" bg-white/10 inset-0 min-h-10 min-w-screen md:min-w-96  lg:min-w-125 p-4 text-lg font-bold text-white text-center  hover:text-black hover:bg-[#CEF549] ">{skill.name}</p>
                                </SlideIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
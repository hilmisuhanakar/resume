import { getTranslations } from "next-intl/server";
import SlideIn from "./slide-in";
import ContactForm from "./contact-form";

export default async function Contact({ locale, meData }) {
    const tPageTitles = await getTranslations("PageTitles");
    return (
        <>
            <section id="iletisim" className="scroll-mt-27 lg:scroll-mt-25.25 overflow-clip">
                <div className="flex flex-col bg-gray-100">
                    <div className="w-full min-h-px bg-[#CEF549]"></div>
                    <h2 className="text-2xl py-10 font-bold text-primary text-center">{tPageTitles("contact")}</h2>
                    <div className="w-full min-h-px bg-[#CEF549]"></div>

                    <div className="relative flex flex-col md:flex-row gap-8 justify-center">
                    <div className="w-full p-7 md:w-[33.5%] md:py-10">
                            <SlideIn direction="down" className="flex flex-col gap-10">
                                <div>
                                    <h2 className="text-4xl font-semibold text-primary tracking-[3px]">
                                        {meData.name}
                                    </h2>
                                    <p className="text-primary font-light">{meData.title}</p>
                                </div>
                                <div>
                                    <p className="text-primary font-bold">Email</p>
                                    <p className="text-primary font-light">{meData.email}</p>
                                </div>
                            </SlideIn>
                        </div>
                        <div className="h-0.5 md:block md:w-0.5 md:h-auto bg-[#CEF549]"></div>
                        <ContactForm locale={locale} />
                    </div>
                </div>
            </section>
        </>
    )
}
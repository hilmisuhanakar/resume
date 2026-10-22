import SlideIn from "./slide-in";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

export default function TimeLine({ data, title, elementId, locale }) {
    const t = useTranslations("PageTitles");
    return (
        <section id={elementId} className="bg-gray-100 flex flex-col items-center justify-center scroll-mt-27 lg:scroll-mt-25.25 overflow-clip">

            <div className="w-full min-h-px bg-[#CEF549]"></div>
            <h2 className="text-2xl py-10 font-bold text-primary">{t(title)}</h2>
            <div className="w-full min-h-px bg-[#CEF549]"></div>

            <div className="relative max-w-4xl mx-auto py-10">

                {/* Dikey çizgi */}
                <div className="absolute left-[50%] top-11 bottom-11 w-px bg-gray-700/50" />

                <div className="space-y-16">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[46%_8%_46%]"
                        >
                            {/* Sol taraf */}
                            <SlideIn direction="left">
                                <div className="text-right">
                                    <time className="font-semibold tracking-[3px] text-primary">
                                        {item.date}
                                    </time>

                                    <p className="mt-3 tracking-[3px] text-primary">
                                        {item.position}
                                    </p>
                                </div>
                            </SlideIn>

                            {/* Timeline noktası */}
                            <SlideIn direction="down">
                                <div className="relative flex justify-center">
                                    <div className="
                                    relative
                                    z-10
                                    mt-1
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-black
                                " />
                                </div>
                            </SlideIn>

                            {/* Sağ taraf */}
                            <SlideIn direction="right">
                                <div>
                                    <h3 className="tracking-[4px] text-primary">
                                        {item.company}
                                    </h3>

                                    <p className="mt-3 leading-7 text-primary">
                                        {item.description}
                                    </p>
                                </div>
                            </SlideIn>
                        </div>
                    ))}
                </div>

            </div>
        </section >
    );
}
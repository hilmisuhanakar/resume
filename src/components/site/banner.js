import Image from "next/image";
import SlideIn from "./slide-in";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export default async function Banner({ locale, meData }) {
    const t = await getTranslations("Navigation");
    return (
        <section id="hakkimda"
            className="relative md:h-[calc(100vh-101px)]  bg-[url('/banner.jpg')] bg-cover 2xl:bg-cover bg-center  px-5 py-16 flex items-center justify-center overflow-clip"
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white/70" />

            {/* Profile Card */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 w-full max-w-225 shadow-xl"
            >
                {/* Image */}
                <SlideIn direction="left">
                    <div className="min-h-100 md:min-h-137.5 bg-white/70">
                        <Image
                            src="/me.png"
                            alt={`${meData.name} - ${meData.title}`}
                            fill
                            priority
                            className="object-cover grayscale-50"
                        />
                    </div>
                </SlideIn>

                {/* Content */}
                <SlideIn direction="right">
                    <div
                        className="bg-white flex items-center px-8 py-12 h-full"
                    >
                        <article>
                            <h1 className="text-4xl md:text-5xl font-semibold text-primary tracking-[3px]">
                                {meData.name.split(' ')[0]} {meData.name.split(' ')[1]}
                                <br />
                                {meData.name.split(' ')[2]}
                            </h1>

                            <div className="w-12 h-1 bg-black my-6" />

                            <h2 className="text-xl md:text-2xl font-light text-primary tracking-[2px]">
                                {meData.title}
                            </h2>

                            <p
                                className="mt-8 text-gray-600 leading-7 text-primary"
                            >
                                {meData.about}
                            </p>

                            <div className="flex gap-4 mt-10">
                                <a
                                    href="#iletisim"
                                    className=" bg-black text-white px-6 py-3 transition hover:bg-gray-800"
                                >
                                    {t("contact")}
                                </a>

                            </div>
                        </article>
                    </div>
                </SlideIn>
                <SlideIn direction="up" className="md:col-span-2">
                    <div className="min-h-20 bg-primary md:mt-5 flex items-center justify-center gap-5">
                        <a href={meData.linkedin} target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" className="hover:cursor-pointer hover: hover:scale-110">
                            <FaLinkedin color="white" size={50} aria-hidden="true"></FaLinkedin>
                        </a>
                        <a href={meData.github} target="_blank" rel="me noopener noreferrer" aria-label="GitHub" className="hover:cursor-pointer hover: hover:scale-110">
                            <FaGithub color="white" size={50} aria-hidden="true"></FaGithub>
                        </a>
                    </div>
                </SlideIn>
            </div>
        </section>
    );
}
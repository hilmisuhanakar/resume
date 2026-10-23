import { FaDownload, FaFilePdf } from "react-icons/fa";
import { useTranslations } from "next-intl";
export default function DownloadMenu({ isOpenDownload, setIsOpenDownload }) {
    const t = useTranslations("DownloadMenu");
    const files = [
        {
            name: "EN_CV",
            href: "/CV_Hilmi_Suhan_Akar_EN.pdf"
        },
        {
            name: "TR_CV",
            href: "/CV_Hilmi_Suhan_Akar_TR.pdf"
        }
    ]
    return (
        <div className="relative flex flex-col items-center justify-center">
            <button title={t("download")} onClick={() => setIsOpenDownload(!isOpenDownload)} className="text-white border border-[#CEF549] rounded-full p-3 bg-primary hover:cursor-pointer">
                <FaDownload className="text-[18px]" />
            </button>
            {isOpenDownload && (
                <div className="absolute top-12 mx-auto w-24 h-auto bg-primary p-1 rounded-sm border  border-[#CEF549]">
                    <ul className="text-black space-y-4 py-2">
                        {files.map((file) => (
                            <li key={file.name}>
                                <a href={file.href} download className="flex items-center p-1 gap-2 text-primary hover:underline  hover:bg-white/10">
                                    <FaFilePdf className="text-[16px] text-red-600" />
                                    <span className="text-white">{file.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
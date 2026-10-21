"use client";
import { Check } from "lucide-react";
import Modal from "./modal";
import { useEffect, useState } from "react";
import { setupTwoFactorAction, verifyTotpAction } from "@/server/actions/two-factor.action";
import Image from "next/image";

export default function SettingTwoFactor({ isTwoFactorModalOpen, setIsTwoFactorModalOpen, isTwoFactorEnabled, setIsTwoFactorEnabled }) {
    const [twoFactor, setTwoFactor] = useState(null);
    const [code, setCode] = useState("");
    useEffect(() => {
        if (!isTwoFactorModalOpen) return;
        if (isTwoFactorEnabled) {
            alert("2FA zaten aktif");
            setIsTwoFactorModalOpen(false);
        }
        else {
            const fetchTwoFactor = async () => {
                try {
                    const response = await setupTwoFactorAction();
                    setTwoFactor(response);
                } catch (error) {
                    console.error("2FA setup hatası:", error);
                }
            };

            fetchTwoFactor();
        }
    }, [isTwoFactorModalOpen]);

    const verifyTotp = async () => {
        try {
            if (twoFactor?.secret) {
                const response = await verifyTotpAction(code, twoFactor?.secret);
                if (response) {
                    setIsTwoFactorEnabled(true);
                    setIsTwoFactorModalOpen(false);
                } else {
                    alert("2FA doğrulama hatası");
                }
            } else {
                alert("2FA secret bulunamadı");
            }
        } catch (error) {
            console.error("2FA doğrulama hatası:", error);
        }
    };


    return (
        <>
            {isTwoFactorModalOpen && (
                <Modal isOpenModal={isTwoFactorModalOpen} setIsOpenModal={setIsTwoFactorModalOpen}>
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold">Çift Faktörlü Kimlik Doğrulama (2FA)</h1>
                        <div className="flex justify-around gap-2">
                            <div className="flex flex-col gap-2 items-center">
                                <div className="flex items-center gap-2">
                                    {
                                        twoFactor?.qrCode && (
                                            <Image
                                                src={twoFactor?.qrCode}
                                                alt="Google Authenticator"
                                                width={150}
                                                height={150}
                                                className="rounded-sm border border-gray-300/50 bg-gray-50"
                                            />
                                        )
                                    }
                                </div>
                                <p className="text-[14px] font-bold text-center text-gray-500 font-mono tracking-wider bg-gray-50 p-2 rounded-sm">{twoFactor?.secret}</p>
                            </div>
                            <div className="flex gap-2">
                                <ul className="list-decimal text-sm">
                                    <li>
                                        <p className="text-[14px] text-[bg-primary]">Google Authenticator indir ya da Microsoft Authenticator indir</p>
                                    </li>
                                    <li>
                                        <p className="text-[14px] text-[bg-primary]">Authenticator uygulamasını aç ve QR kodu tarat</p>
                                    </li>
                                    <li>
                                        <p className="text-[14px] text-[bg-primary]">Ekranınızda görünen 6 hanelik kodu gir</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <input type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="w-full border border-gray-300/50 rounded-sm p-2 focus:outline-none"
                                                placeholder="6 hanelik kodu gir" />
                                            <button className="flex gap-2 items-center bg-primary text-white rounded-sm p-2" onClick={verifyTotp}>
                                                <Check size={14} />
                                                <span className="text-[14px]">Doğrula</span>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
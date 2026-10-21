"use client";
import PageTop from "@/components/admin/UI/page-top";
import Switch from "@/components/admin/UI/switch";
import { useState, useRef } from "react";
import { Bell, KeyRound, Mail } from "lucide-react";
import SettingTwoFactor from "@/components/admin/setting-two-factor";

export default function SettingData({ session }) {
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(session.hasTotp? true : false);
    const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);

    const [notifications, setNotifications] = useState(true);
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [isEmailNotificationsModalOpen, setIsEmailNotificationsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <PageTop title="Ayarlar" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <Switch value={isTwoFactorEnabled} onChange={() => setIsTwoFactorModalOpen(!isTwoFactorModalOpen)} label="2FA Ayarları (TOTP)" icon={<KeyRound size={16} />} />
                <Switch value={isNotificationsModalOpen} onChange={setIsNotificationsModalOpen} label="Bildirimler" icon={<Bell size={16} />} />
                <Switch value={isEmailNotificationsModalOpen} onChange={setIsEmailNotificationsModalOpen} label="Email Bildirimleri" icon={<Mail size={16} />} />
            </div>
            <SettingTwoFactor isTwoFactorModalOpen={isTwoFactorModalOpen} setIsTwoFactorModalOpen={setIsTwoFactorModalOpen} isTwoFactorEnabled={isTwoFactorEnabled} setIsTwoFactorEnabled={setIsTwoFactorEnabled} />
        </div>
    );
}
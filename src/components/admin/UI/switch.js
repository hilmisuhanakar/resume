import { Check, X } from "lucide-react";

export default function Switch({ value, onChange, label, icon }) {
    return (
        <div className="flex items-center justify-between gap-2 border border-gray-300/50 bg-gray-200/40 rounded-md p-2 ">
            <div className="flex items-center gap-2">
                {icon}
                <p className="text-[14px] text-[bg-primary] font-bold">{label}</p>
            </div>
            <div onClick={() => onChange(!value)} className={`relative items-center gap-2 w-12 h-6 rounded-full p-px ${value ? " bg-green-600" : " bg-gray-400/60"} transition-all duration-500 cursor-pointer`}>
                <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${value ? "translate-x-6" : "translate-x-0"}`}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2">
                    <Check size={16} className="text-white" />
                    <X size={16} className="text-white" />
                </div>
            </div>
        </div>
    );
}
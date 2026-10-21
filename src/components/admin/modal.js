"use client";

import { X } from "lucide-react";

export default function Modal({ children, isOpenModal, setIsOpenModal }) {
    return (
        <div className={`${isOpenModal ? "block" : "hidden"}`}>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex justify-center items-center">
                <div className="w-full lg:max-w-3xl md:max-w-2xl max-w-lg max-h-full overflow-y-auto">
                    <X className="absolute top-10 right-10 w-6 h-6 text-white hover:cursor-pointer hover:text-gray-400 transition-all duration-300" size={24} onClick={() => setIsOpenModal(false)} />
                    <div className="bg-white p-4 rounded-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
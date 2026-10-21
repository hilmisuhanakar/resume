"use client";

import Link from "next/link";
import { Pencil, Trash2, EllipsisVertical } from "lucide-react";
import { useState } from "react";

export default function ActionMenu({ row, onClick }) {
    const [actionMenuOpenRowId, setActionMenuOpenRowId] = useState(null);
    return (
        <div className="relative flex items-center justify-center">

            <button type="button" className="cursor-pointer bg-[#bbf452] text-white flex items-center justify-center rounded-full w-6 h-6" onClick={() => setActionMenuOpenRowId(actionMenuOpenRowId === row.original.id ? null : row.original.id)}>
                <EllipsisVertical className="w-5 h-5 text-black" size={12} />
            </button>

            {actionMenuOpenRowId === row.original.id && (
                <div className="absolute top-full left-0 mt-2 z-50 w-36 bg-white border border-gray-200 rounded-md shadow-lg">

                    <button
                        onClick = {onClick}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                        <Pencil size={16} />
                        Düzenle
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                        <Trash2 size={16} />
                        Sil
                    </button>

                </div>
            )}

        </div>
    );
}
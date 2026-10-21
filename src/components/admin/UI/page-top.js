import { PlusSquare } from "lucide-react";

export default function PageTop({ title, btnOnClick }) {
    return (
        <div className="flex justify-between items-center mb-5 border-b border-gray-300">

            <h1 className="text-2xl font-bold pb-2">
                {title}
            </h1>

            {btnOnClick && <div className="pb-2">
                <button
                    onClick={btnOnClick}
                    className="bg-primary text-white p-2 rounded-sm flex text-center items-center gap-2 text-sm hover:cursor-pointer hover:bg-primary/80 transition-all duration-300"
                >
                    <PlusSquare
                        className="w-4 h-4 text-white"
                        size={16}
                    />
                    EKLE
                </button>
            </div>}

        </div>
    );
}
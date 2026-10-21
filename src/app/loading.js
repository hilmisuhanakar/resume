import { Loader2 } from "lucide-react";

export default function RootLoading() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
            <Loader2 className="w-20 h-20 animate-spin" />
        </div>
    );
}
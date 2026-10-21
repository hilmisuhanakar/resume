import Link from "next/link";

export default function AdminNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/" className="text-primary hover:text-primary-dark">Go back to the home page</Link>
        </div>
    );
}
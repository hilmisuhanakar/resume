export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const languages = {
        "tr-TR": baseUrl,
        "en-US": `${baseUrl}/en`,
        "x-default": baseUrl,
    };

    return [
        {
            url: baseUrl,
            changeFrequency: "monthly",
            priority: 1,
            alternates: { languages },
        },
        {
            url: `${baseUrl}/en`,
            changeFrequency: "monthly",
            priority: 0.9,
            alternates: { languages },
        },
    ];
}

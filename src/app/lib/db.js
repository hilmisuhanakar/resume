import 'server-only'

export const meInfoDb = (locale) => {
    const me = [
        {
            language: "tr",
            name: "Hilmi Sühan Akar",
            jobTitle: "Yazılım Geliştirici",
            email: "hilmisahanakar@outlook.com.tr",
            description: ".NET Core ile güçlü backend sistemleri, Next.js ile modern web arayüzleri geliştiriyorum. Sürdürülebilir, performanslı ve kullanıcı odaklı uçtan uca çözümler üretmeye odaklanıyorum.",
        },
        {
            language: "en",
            name: "Hilmi Sühan Akar",
            jobTitle: "Software Developer",
            email: "hilmisahanakar@outlook.com.tr",
            description: "I am a software developer with a strong focus on building sustainable, performant and user-centric end-to-end solutions using .NET Core and Next.js.",
        }
    ]

    return me.find(item => item.language === locale);
};

export const getSkillsByDb = () => {
    const skills = [
        "C#",
        ".NET Core",
        "ASP.NET Core",
        "MS SQL Server",
        "Entity Framework",
        "Entity Framework Core",
        "ADO.NET",
        "Redis",
        "PostgreSQL",
        "MongoDB",
        "JavaScript",
        "jQuery",
        "React",
        "React Native",
        "Node.js",
        "Next.js",
        "RabbitMQ",
        "SignalR",
        "WebSocket",
        "Azure DevOps",
        "Git",
        "Docker",
    ];

    return skills;
}

export const getEducationByDb = (locale) => {
    const education = [
        {
            language: "tr",
            date: "2017 - 2021",
            position: "Bilgisayar Mühendisliği",
            company: "Nişantaşı Üniversitesi",
            description:
                "Nişantaşı Üniversitesi Bilgisayar Mühendisliği bölümünde okudum.",
        },
        {
            language: "en",
            date: "2017 - 2021",
            position: "Computer Engineering",
            company: "Nişantaşı University",
            description:
                "I studied Computer Engineering at Nişantaşı University.",
        }
    ];

    return education.filter(item => item.language === locale);
}

export const getExperienceByDb = (locale) => {
    const experiences = [
        {
            language: "tr",
            date: "2022 - 2026",
            position: "Yazılım Geliştirici",
            company: "E-VET Yazılım (Hasvet)",
            description:
                "NET Core, C# ve SQL Server ile ERP, CMS ve kurumsal web uygulamaları geliştirdim. Backend, veritabanı ve iş süreçleri odaklı uçtan uca geliştirme süreçlerinde görev aldım.",
        },
        {
            language: "tr",
            date: "2022",
            position: "Yazılım Geliştirici",
            company: "Athena Bilgisayar",
            description:
                "Java ve SQL Server kullanarak REST API servisleri geliştirdim. Araç takip sisteminin backend geliştirme ve canlıya alma süreçlerinde görev aldım.",
        },
        {
            language: "tr",
            date: "2021",
            position: "Stajyer",
            company: "Sodyum İnternet ve Medya",
            description:
                "ASP.NET MVC, Entity Framework ve SQL Server ile CMS tabanlı web uygulamaları geliştirdim. Statik web sitelerini dinamik yönetilebilir sistemlere dönüştürdüm.",
        },
        {
            language: "en",
            date: "2022 - 2026",
            position: "Software Developer",
            company: "E-VET Yazılım (Hasvet)",
            description:
                "I developed ERP, CMS and corporate web applications using NET Core, C# and SQL Server. I worked on backend, database and process development and deployment processes.",
        },
        {
            language: "en",
            date: "2022",
            position: "Software Developer",
            company: "Athena Bilgisayar",
            description:
                "I developed REST API services using Java and SQL Server. I worked on the backend development and deployment of the vehicle tracking system.",
        },
        {
            language: "en",
            date: "2021",
            position: "Internship",
            company: "Sodyum İnternet ve Medya",
            description:
                "I developed CMS-based web applications using ASP.NET MVC, Entity Framework and SQL Server. I converted static web sites into dynamic manageable systems.",
        },
    ];

    return experiences.filter(item => item.language === locale);
}
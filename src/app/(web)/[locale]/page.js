import Banner from "@/components/site/banner";
import Experience from "@/components/site/experience";
import Education from "@/components/site/education";
import Skills from "@/components/site/skills";
import Contact from "@/components/site/contact";
import { getMeInfoAction } from "@/server/actions/profile.action";
import { getSkillsAction } from "@/server/actions/skill.action";
import { getMessages } from "next-intl/server";

export default async function Home({ params }) {
  const { locale } = await params;
  const meData = await getMeInfoAction(locale);
  const skills = await getSkillsAction();
  const messages = await getMessages({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pageUrl = locale === "tr" ? baseUrl : `${baseUrl}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Hilmi Sühan Akar",
        inLanguage: ["tr-TR", "en-US"],
        publisher: { "@id": `${baseUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        url: pageUrl,
        name: messages.Metadata.title,
        description: messages.Metadata.description,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${baseUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: meData.name,
        jobTitle: meData.title,
        description: meData.about,
        url: baseUrl,
        image: `${baseUrl}/me.png`,
        sameAs: [meData.linkedin, meData.github].filter(Boolean),
        knowsAbout: skills.map((skill) => skill.name),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Antalya",
          addressCountry: "TR",
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Banner locale={locale} meData={meData} />
      <Experience locale={locale} />
      <Education locale={locale} />
      <Skills locale={locale} skills={skills} />
      <footer>
        <Contact locale={locale} meData={meData} />
      </footer>
    </main>
  );
}

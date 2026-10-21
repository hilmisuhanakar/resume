import Banner from "@/components/site/banner";
import Experience from "@/components/site/experience";
import Education from "@/components/site/education";
import Skills from "@/components/site/skills";
import Contact from "@/components/site/contact";
import { getMeInfoAction } from "@/server/actions/profile.action";

export default async function Home({ params }) {
  const { locale } = await params;
  const meData = await getMeInfoAction(locale);
  return (
    <>
      <Banner locale={locale} meData={meData} />
      <Experience locale={locale} />
      <Education locale={locale} />
      <Skills locale={locale} />
      <footer>
        <Contact locale={locale} meData={meData} />
      </footer>
    </>
  );
}

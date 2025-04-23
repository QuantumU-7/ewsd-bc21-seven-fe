import LatestIdeaSection from "@/components/latest-idea-section";
import PopularSection from "@/components/popular-section/PopularSection";
import ClosureDate from "@/components/closure-date";
export default async function Home() {

  return (
    <>
      <ClosureDate />
      <PopularSection />
      <LatestIdeaSection />
    </>
  );
}

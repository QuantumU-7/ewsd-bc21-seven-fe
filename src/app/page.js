import LatestIdeaSection from "@/components/latest-idea-section";
import PopularSection from "@/components/popular-section/PopularSection";

export default async function Home() {

  return (
    <div className="">
      <PopularSection />
      <LatestIdeaSection />
    </div>
  );
}

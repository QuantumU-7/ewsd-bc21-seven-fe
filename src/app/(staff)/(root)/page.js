import LatestIdeaSection from "@/components/latest-idea-section";
import PopularSection from "@/components/popular-section/PopularSection";
import { IdeasProvider } from "@/providers/IdeasContext";

export default async function Home() {

  return (
    <>
      <PopularSection />
      <LatestIdeaSection />
    </>
  );
}

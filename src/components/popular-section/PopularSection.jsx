"use client";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { getPopularIdeas } from "@/services/ideaManagementService";
import { useEffect, useState } from "react";
import { convertBase64ToImage } from "@/utils/image";
import defaultImg from "@/public/images/default.png";
import { extractTextFromFirstP } from "@/utils/textContent";
import { useIdeas } from "@/providers/IdeasContext";

const PopularSection = () => {
  // Create local state as fallback
  const [localPopularIdeas, setLocalPopularIdeas] = useState([]);
  
  // Safely access context with fallback
  const ideasContext = useIdeas();
  const { 
    popularIdeas = localPopularIdeas, 
    setPopularIdeas = setLocalPopularIdeas 
  } = ideasContext || {};

  const fetchPopularIdeas = async () => {
    try {
      const data = await getPopularIdeas();
      setPopularIdeas(data.data);
    } catch (error) {
      console.error("Error fetching popular ideas:", error);
    }
  };

  useEffect(() => {
    if (!popularIdeas || popularIdeas?.length === 0) {
      fetchPopularIdeas();
    }
  }, []);

  // Check if data is available before rendering
  if (!popularIdeas || popularIdeas?.length === 0) {
    return (
      <section className="max-w-7xl mx-auto space-y-8 my-8 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-dark">Trending Now</h1>
        </div>
        <div className="h-[358px] flex items-center justify-center">
          <p>Loading trending ideas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto space-y-8 my-8 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-dark">Trending Now</h1>
      </div>

      <div>
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Most Popular Idea */}
          <Link href={`/ideas/${popularIdeas[0]?.id}`} className="flex-1">
            <div className="group relative h-[250px] lg:h-[358px] rounded-md cursor-pointer overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${
                    popularIdeas[0]?.thumbnail !== null
                      ? convertBase64ToImage(popularIdeas[0]?.thumbnail)
                      : defaultImg.src
                  }')`,
                }}
              ></div>

              {/* Content Overlay */}
              <div className="relative z-10 bg-primary w-full h-full bg-opacity-60 text-white rounded-md p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="">
                    By <b>{popularIdeas[0]?.posted_by?.firstname}</b> from{" "}
                    <b>{popularIdeas[0]?.category?.name}</b>
                  </p>
                  <h1 className="text-2xl lg:text-4xl">
                    {popularIdeas[0]?.title}
                  </h1>
                </div>
                <div>
                  <p>{extractTextFromFirstP(popularIdeas[0]?.description)}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Idea Categories */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {popularIdeas && popularIdeas.slice(1, 5).map((idea) => (
              <Link href={`/ideas/${idea.id}`} key={idea.id} className="inline-block h-full">
                <CategoryCard
                  categoryName={idea.category.name}
                  title={idea.title}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
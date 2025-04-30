"use client";
import React, { useEffect } from "react";
import IdeaCard from "../shared/common/idea-card/IdeaCard";
import LoadingIdeaCard from "../shared/common/idea-card/LoadingIdeaCard";
import Link from "next/link";
import CommonPagination from "../shared/common/Pagination";
import { useIdeas } from "@/providers/IdeasContext";

const LatestIdeaSection = () => {
  // Initialize local state as fallback
  // const [localIdeas, setLocalIdeas] = useState([]);
  // const [localCurrentPage, setLocalCurrentPage] = useState(1);
  // const [localTotalPages, setLocalTotalPages] = useState(1);
  // const [loading, setLoading] = useState(false);
  
  // Try to use context, but fall back to local state if undefined
  const ideasContext = useIdeas();
  const {
    ideas ,
    // setIdeas = setLocalIdeas,
    homeCurrentPage ,
    setHomeCurrentPage ,
    homeTotalPages,
    // setHomeTotalPages = setLocalTotalPages,
    fetchIdeas,
    loading
  } = ideasContext || {};
  

  useEffect(() => {
      fetchIdeas(homeCurrentPage);
  }, []);

  const handlePageChange = (page) => {
    setHomeCurrentPage(page);
    fetchIdeas(page);
  }

  return (
    <section className="my-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-4xl font-bold text-dark">All Ideas</h1>
        {loading
          ? [...Array(5)].map((_, index) => <LoadingIdeaCard key={index} />)
          : ideas && ideas.map((idea) => (
              <div key={idea.id}>
                <Link href={`/ideas/${idea.id}`}>
                  <IdeaCard
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    description={idea.description}
                    image={idea.thumbnail}
                    category={idea.category.name}
                    posted_At={idea.posted_on}
                    user={`${idea.posted_by.firstname} ${idea.posted_by.lastname}`}
                    like_count={idea.likes_count}
                    view_count={idea.views_count}
                    dept_name={idea.department.name}
                  />
                </Link>
              </div>
            ))}

        {!loading && ideas?.length === 0 && (
          <div className="flex justify-center items-center h-[300px]">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Ideas Found
            </h2>
          </div>
        )}

        <CommonPagination
          isLoading={loading}
          currentPage={homeCurrentPage}
          totalPages={homeTotalPages}
          onPageChange={handlePageChange}
          position="center"
        />
      </div>
    </section>
  );
};

export default LatestIdeaSection;
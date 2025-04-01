"use client";
import React, { useEffect, useState } from "react";
import IdeaCard from "../shared/common/idea-card/IdeaCard";
import { getAllIdeasService } from "@/services/ideaManagementService";
import LoadingIdeaCard from "../shared/common/idea-card/LoadingIdeaCard";
import Link from "next/link";
import CommonPagination from "../shared/common/Pagination";

// const ideas = [
//   {
//     id: "01",
//     title: "Workplace Well-Being & Mental Health Support",
//     description:
//       "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
//     image:
//       "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "02",
//     title: "Workload Management & Efficiency",
//     description:
//       "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
//     image:
//       "https://images.unsplash.com/photo-1562825606-7e7187e44a83?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "03",
//     title: "Career Growth & Training",
//     description:
//       "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
//     image:
//       "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "04",
//     title: "Better Communication & Transparency",
//     description:
//       "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
//     image:
//       "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "05",
//     title: "Workplace Well-Being & Mental Health Support",
//     description:
//       "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
//     image:
//       "https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

const LatestIdeaSection = () => {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const data = await getAllIdeasService(currentPage, limit);
        setIdeas(data.data);
        setTotalPages(data.pagination.total_pages || 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };

    fetchIdeas();
  }, [currentPage]);

  return (
    <section className="my-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-4xl font-bold text-dark">All Ideas</h1>
        {loading
          ? [...Array(5)].map((_, index) => <LoadingIdeaCard key={index} />)
          : ideas.map((idea) => (
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

        {!loading && ideas.length === 0 && (
          <div className="flex justify-center items-center h-[300px]">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Ideas Found
            </h2>
          </div>
        )}

        <CommonPagination
          isLoading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          position="center"
        />
      </div>
    </section>
  );
};

export default LatestIdeaSection;

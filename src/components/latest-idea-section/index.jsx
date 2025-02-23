import React from "react";
import IdeaCard from "../shared/common/idea-card/IdeaCard";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ideas = [
  {
    id: "01",
    title: "Workplace Well-Being & Mental Health Support",
    description:
      "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "02",
    title: "Workload Management & Efficiency",
    description:
      "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
    image:
      "https://images.unsplash.com/photo-1562825606-7e7187e44a83?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "03",
    title: "Career Growth & Training",
    description:
      "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "04",
    title: "Better Communication & Transparency",
    description:
      "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
    image:
      "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "05",
    title: "Workplace Well-Being & Mental Health Support",
    description:
      "Staff often feel overburdened with administrative tasks. Suggestion: Implement AI and automation tools to reduce repetitive work and improve efficiency.",
    image:
      "https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const LatestIdeaSection = () => {
  return (
    <section className="my-28">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            id={idea.id}
            title={idea.title}
            description={idea.description}
            image={idea.image}
          />
        ))}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default LatestIdeaSection;

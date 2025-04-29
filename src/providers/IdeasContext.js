"use client";

import { getAllIdeasService } from "@/services/ideaManagementService";
import { createContext, useContext, useState } from "react";

const IdeasContext = createContext();

/* This context state is to control HomePage/Latest Page idea to prevent unnecessary fetching */
export const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([]);
  const [popularIdeas, setPopularIdeas] = useState([]);
  const [homeCurrentPage, setHomeCurrentPage] = useState(1);
  const [homeTotalPages, setHomeTotalPages] = useState(5);
  const [loading, setLoading] = useState(false);
  const [ editingIdeaId, setEditingIdeaId ] = useState(null);
  const limit = 5;

    const fetchIdeas = async (page) => {
      setLoading(true);
      try {
        const data = await getAllIdeasService(page, limit);
        setIdeas(data.data);
        setHomeTotalPages(data.pagination.total_pages || 1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };

  return (
    <IdeasContext.Provider
      value={{
        ideas,
        setIdeas,
        popularIdeas,
        setPopularIdeas,
        homeCurrentPage,
        setHomeCurrentPage,
        homeTotalPages,
        setHomeTotalPages,
        fetchIdeas,
        loading,
        editingIdeaId,
        setEditingIdeaId,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  return useContext(IdeasContext);
};

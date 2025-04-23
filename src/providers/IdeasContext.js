"use client";

import { createContext, useContext, useState } from "react";

const IdeasContext = createContext();

/* This context state is to control HomePage/Latest Page idea to prevent unnecessary fetching */
export const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([]);
  const [popularIdeas, setPopularIdeas] = useState([]);
  const [homeCurrentPage, setHomeCurrentPage] = useState(1);
  const [homeTotalPages, setHomeTotalPages] = useState(5);

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
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  return useContext(IdeasContext);
};

"use client";

import { createContext, useContext, useState } from "react";
import {
  getAllUsers,
} from "@/services/userManagementService";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        fetchUsers,
        loading,
        error,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};

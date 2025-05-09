"use client";

import { createContext, useContext, useState } from "react";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "@/services/userManagementService";
import { toast } from "sonner";
import { getAllDepartments } from "@/services/departmentManagementService";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [searchKey, setSearchKey] = useState(null);
  const [departments, setDepartments] = useState([]);

  const fetchAllDepartments = async () => {
    try {
      const response = await getAllDepartments(1, 99);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  };

  /* Note: API Search is equal to keyword form field */
  const fetchUsers = async (
    page,
    limit = 10,
    department_id = null,
    keyword = null,
    role_id = null
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers(
        page,
        limit,
        department_id,
        keyword,
        role_id
      );
      setUsers(response.data);
      setTotalPages(response.pagination.total_pages);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    setLoading(true);
    try {
      await createNewUser(user);
      fetchUsers(currentPage);
      toast("Crated New User");
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (id, updatedUser) => {
    setLoading(true);
    try {
      await updateUserById(id, updatedUser);
      fetchUsers(currentPage);
      toast.success("Updated User");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await deleteUserById(id);
      setTimeout(() => {
        fetchUsers(currentPage);
      }, 300);

      toast.success("Deleted User");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        fetchUsers,
        addUser,
        currentPage,
        setCurrentPage,
        loading,
        error,
        totalPages,
        deleteUser,
        editUser,
        isFilterMode,
        setIsFilterMode,
        roleId,
        setRoleId,
        departmentId,
        setDepartmentId,
        searchKey,
        setSearchKey,
        departments,
        fetchAllDepartments,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};

"use client";

import { createContext, useContext, useState } from "react";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/services/categoryManagementService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const fetchCategories = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCategories(page);
      setCategories(response.data);
      setTotalPages(response.pagination.total_pages || 1);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name) => {
    setLoading(true);
    try {
      await createNewCategory(name);
      fetchCategories(currentPage);
      toast("Crated New Category");
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id, newName) => {
    setLoading(true);
    try {
      await updateCategory(id, newName);
      fetchCategories(currentPage);
      toast("Updated Category");
    } catch (error) {
      console.error("Error editing category:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedCategory = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      fetchCategories(currentPage);
      toast("Deleted Category");
    } catch (error) {
      console.error("Error deleted category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        addCategory,
        loading,
        error,
        editingCategory,
        setEditingCategory,
        editCategory,
        deleteSelectedCategory,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};

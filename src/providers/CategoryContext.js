"use client";

import { createContext, useContext, useState } from "react";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/services/categoryManagementService";
import { toast } from "sonner";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCategories();
      setCategories(response);
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
      const response = await createNewCategory(name);
      console.log({ response });
      fetchCategories();
      toast("Crated New Category");
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id, newName) => {
    setLoading(true);
    try {
      const response = await updateCategory(id, newName);
      console.log({ response });
      fetchCategories();
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
      const response = await deleteCategory(id);
      console.log({ response });
      fetchCategories();
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
        deleteSelectedCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};

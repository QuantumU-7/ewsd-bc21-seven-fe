import { getAccessToken } from "@/utils/tokenManagement";
import axios from "axios";

export const getAllCategories = async (page, limit=5) => {
  try {
    const token = getAccessToken();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {page,limit},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("Fetched Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching ideas:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(
        error.response.data.message || "Fetch All Categories failed"
      );
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const createNewCategory = async (name) => {
  try {
    const token = getAccessToken();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Posted a new category", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding ideas:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "add Categories failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const updateCategory = async (id, name) => {
  try {
    const token = getAccessToken();
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}?category_name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Edited a new category", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error editing category:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Editing Categories failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const deleteCategory = async (id) => {
  try {
    const token = getAccessToken();
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Deleted a new category", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Deleting Categories failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

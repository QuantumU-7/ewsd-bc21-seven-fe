import { getAccessToken } from "@/utils/tokenManagement";
import axios from "axios";

export const getAllIdeasService = async (pageNumber = 1, limit = 5) => {
  try {
    const token = getAccessToken();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/?page=${pageNumber}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching ideas:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Fetch All Ideas failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// Fix for the createNewIdeaService function
export const createNewIdeaService = async (formData) => {
  try {
    const token = getAccessToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let axios set the content type with boundary
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating new idea:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Create new idea failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const updateIdeaService = async (ideaId, formData) => {
  try {
    const token = getAccessToken();

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/${ideaId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let axios set the content type with boundary
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating idea:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Update idea failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}

export const deleteIdeaService = async (ideaId) => {
  try {
    const token = getAccessToken();

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/${ideaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting idea:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Delete idea failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
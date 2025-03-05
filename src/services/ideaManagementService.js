import axios from "axios";

export const getAllIdeasService = async (pageNumber = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/?page=${pageNumber}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Fetch All Ideas failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

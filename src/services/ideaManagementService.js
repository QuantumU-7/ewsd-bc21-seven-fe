import { getAccessToken } from "@/utils/tokenManagement";
import axios from "axios";

export const getAllIdeasService = async (pageNumber = 1, limit = 5) => {
  try {
    const token = getAccessToken(); 
    console.log("Using Token:", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas/?page=${pageNumber}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          Accept: "application/json",
        },
      }
    );
    
    console.log("Fetched Ideas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ideas:", error.response ? error.response.data : error.message);
    
    if (error.response) {
      throw new Error(error.response.data.message || "Fetch All Ideas failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const createNewIdeaService = async () => {
  try {
    const token = getAccessToken(); 
    console.log("Using Token:", token);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/ideas`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          Accept: "application/json",
        },
      }
    );
    

    return response.data;
  } catch (error) {
    console.error("Error creating new idea:", error.response ? error.response.data : error.message);
    
    if (error.response) {
      throw new Error(error.response.data.message || "Create new idea failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}

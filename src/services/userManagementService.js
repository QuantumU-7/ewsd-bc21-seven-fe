import { getAccessToken } from "@/utils/tokenManagement";
import axios from "axios";

export const getAllUsers = async () => {
    try {
      const token = getAccessToken();
  
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
  
      console.log("Fetched Users:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching ideas:",
        error.response ? error.response.data : error.message
      );
  
      if (error.response) {
        throw new Error(
          error.response.data.message || "Fetch All Users failed"
        );
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }
  };
import actionApi from "@/api/config";

export const getMe = async () => {
  try {
    const response = await actionApi().get("/users/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request Failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

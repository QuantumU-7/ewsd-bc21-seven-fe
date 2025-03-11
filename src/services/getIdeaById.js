import actionApi from "@/api/config";

export const getIdeaById = async (ideaId) => {
  try {
    const response = await actionApi().get(`/ideas/${ideaId}`)
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request Failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

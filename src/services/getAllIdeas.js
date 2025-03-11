import actionApi from "@/api/config";

export const getAllIdeaService = async (page = 1) => {
  try {
    const response = await actionApi().get("/ideas", {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request Failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

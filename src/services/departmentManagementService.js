import actionApi from "@/api/config";

export const getAllDepartments = async (page, limit = 5) => {
  try {
    const response = await actionApi().get(`/departments`, {
      params: {
        page,
        limit,
      }
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching ideas:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(
        error.response.data.message || "Fetch All Departments failed"
      );
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
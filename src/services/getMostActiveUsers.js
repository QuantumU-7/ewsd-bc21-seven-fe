import actionApi from "@/api/config";

export const getMostActiveUsers = async ({ page,
    limit }) => {

    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;

    try {
        const response = await actionApi().get("/dashboard/most-active-users", { params });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching most active users:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}
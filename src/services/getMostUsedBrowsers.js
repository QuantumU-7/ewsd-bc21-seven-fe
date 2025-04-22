import actionApi from "@/api/config";

export const getMostUsedBrowsers = async ({ page,
    limit }) => {

    const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;

    try {
        const response = await actionApi().get("/dashboard/most-used-browsers", { params });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching most used browsers:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}
import actionApi from "@/api/config";

export async function ideasByCategoryService(id = null) {
  const url = id ? `dashboard/ideas-by-category/?department_id=${id}` : "dashboard/ideas-by-category";
  try {
    const response = await actionApi().get(url, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch ideas by category:", error);
    throw error;
  }
}

import actionApi from "@/api/config";

export async function ideasByDepartmentService() {
  try {
    const response = await actionApi().get("dashboard/ideas-by-department", {
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

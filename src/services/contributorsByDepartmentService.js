import actionApi from "@/api/config";

export async function contributorsByDepartmentService() {
  try {
    const response = await actionApi().get("dashboard/contributers-by-department", {
      headers: {
        accept: "application/json",
      },
    });

    if (!response) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch contributors by department:", error);
    throw error;
  }
} 
import actionApi from "@/api/config";

export const exportIdeaToCSV = async (ideaId) => {
  try {
    const response = await actionApi().get(`/ideas/export/csv`, {
      responseType: "blob",
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: "text/csv" });
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `idea-data.csv`);
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    // Clean up the URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting idea to CSV:", error);
    throw error;
  }
}; 
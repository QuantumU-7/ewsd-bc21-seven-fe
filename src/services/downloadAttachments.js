import actionApi from "@/api/config";

export const downloadAttachments = async () => {
  try {
    const response = await actionApi().get("/ideas/files/download", {
      responseType: "blob", // Important for handling file downloads
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attachments.zip"); // You can customize the filename
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    // Clean up the URL
    window.URL.revokeObjectURL(url);

    return response;
  } catch (error) {
    console.error("Error downloading attachments:", error);
    throw error;
  }
}; 
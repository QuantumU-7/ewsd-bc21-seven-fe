import actionApi from "@/api/config";

// services/report.js
export const ideaReportService = async (ideaId,remark) => {
    try {
      const response = await actionApi().post(`/ideas/${ideaId}/reports`, {
        reason:remark
      })

      return response.data
    } catch (error) {
      console.error('Error reporting idea:', error);
      throw error;
    }
  };
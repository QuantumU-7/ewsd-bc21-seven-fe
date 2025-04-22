import actionApi from "@/api/config";

export const trackUserActionsServices = async (pagename, accessedby, browsername) => {
  try {
    const response = await actionApi().post(`/page-access/`, {
      pagename,
      accessedby,
      browsername,
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
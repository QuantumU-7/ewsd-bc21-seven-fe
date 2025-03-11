import actionApi from "@/api/config";

export const createComment = async (ideaId,isAnonymous,comment) => {
  try {
    const response = await actionApi().post(`/comments`,{
        comment,
        ispostedanon:isAnonymous,
        ideaid:ideaId
    })
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request Failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

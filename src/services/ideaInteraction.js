import actionApi from "@/api/config";

// services/ideaInteractions.js
export const toggleLikeIdea = async (ideaId,isLike= false) => {
    try {
      const response = await actionApi().post(`/likes/`, {
        ideaid:ideaId,
        isliked:isLike,
        isdisliked:!isLike
      })

      return response.data
    } catch (error) {
      console.error('Error liking idea:', error);
      throw error;
    }
  };
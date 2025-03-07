import actionApi from "@/api/config";

// services/ideaInteractions.js
export const toggleLikeIdea = async (ideaId,isLike= false) => {
    try {
      const response = await actionApi().post(`/likes`, {
        ideaid:ideaId,
        isliked:isLike,
        isdisliked:!isLike
      })
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to like the idea');
      }
  
      return response.data
    } catch (error) {
      console.error('Error liking idea:', error);
      throw error;
    }
  };
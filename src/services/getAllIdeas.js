import actionApi from "@/api/config";

export const getAllIdeaService = async ({
  page,
  limit,
  categories = null,
  sortDate = null,
  sortLikes = null,
  sortPopularity = null,
  searchQuery = null,
  myIdeas = false,
  departments = null,
  most_viewed = null,
} = {}) => {
  try {
    const params = {};

    // Only add page and limit if they're explicitly provided
    if (page) params.page = page;
    if (limit) params.limit = limit;

    // Add filters
    if (
      myIdeas ||
      (categories && categories.length > 0) ||
      (departments && departments.length > 0)
    ) {
      params.filter = {};

      if (myIdeas) {
        params.filter.my = myIdeas;
      }

      if (departments && departments.length > 0) {
        params.filter.department = departments;
      }

      if (categories && categories.length > 0) {
        params.filter.category = categories;
      }
    }

    // Add sorts
    if (sortDate !== null || sortLikes !== null || sortPopularity !== null || most_viewed !== null) {
      params.sort = {};

      if (sortDate !== null) {
        params.sort.date = sortDate;
      }

      if (sortLikes !== null) {
        params.sort.likes = sortLikes;
      }

      if (sortPopularity !== null) {
        params.sort.popularity = sortPopularity;
      }

      if (most_viewed !== null) {
        params.sort.most_viewed = most_viewed;
      }
    }

    // Add search
    if (searchQuery) {
      params.search = searchQuery;
    }

    const response = await actionApi().get("/ideas/", { params });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request Failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

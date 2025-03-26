import actionApi from "@/api/config";

export const getAllUsers = async (page, limit =5) => {
  try {

    const response = await actionApi().get(`/users`, {
      params: {
        page,
        limit,
      }
    });

    console.log("Fetched Users:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching ideas:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Fetch All Users failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const createNewUser = async (user) => {
  try {
    const response = await actionApi().post(`/users`, {
      firstname: user.name,
      lastname: "University",
      email: user.email,
      username: user.name,
      default_pwd: user.password,
      password: user.password,
      is_disabled: false,
      is_locked: false,
      lastlogin: "2025-03-20T01:26:42.978Z",
      role_id: user.userRole,
      department_id: user.department,
    });

    console.log("Posted a new user", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding user:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "add user failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const deleteUserById = (userId) => {
  try {
    const response = actionApi().delete(`/users/${userId}`);

    console.log("Deleted user:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Delete user failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}

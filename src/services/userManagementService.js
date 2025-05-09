import actionApi from "@/api/config";

export const getAllUsers = async (page, limit =10, department_id = null, search = null, role_id=null) => {
  try {

    const response = await actionApi().get(`/users`, {
      params: {
        page,
        limit,
        department_id,
        search,
        role_id
      }
    });

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
      lastname: "",
      email: user.email,
      username: user.name,
      default_pwd: user.password,
      password: user.password,
      "isdisabled": false,
      "islocked": false,
      lastlogin: null,
      role_id: user.userRole,
      department_id: user.department,
    });

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

export const updateUserById = async (userId, user) => {
  try {
    const response = await actionApi().patch(`/users/${userId}`, {
      firstname: user.name,
      lastname: "",
      email: user.email,
      username: user.name,
      default_pwd: user.password,
      password: user.password,
      role_id: user.userRole,
      department_id: user.department,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Update user failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}
export const getUserById = async (userId) => {
  try {
    const response = await actionApi().get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "Fetch User failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}

export const deleteUserById = (userId) => {
  try {
    const response = actionApi().delete(`/users/${userId}`);

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

export const enableDisableUser = async (id, is_disabled) => {
  const apiType = is_disabled ? "enable" : "disable";
  try {
    const response = await actionApi().patch(`/users/${id}/${apiType}`);

    return response.data;
  } catch (error) {
    console.error(
      "Error disabling user:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "disable user failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const hideUnhideUser = async (id, is_hidden) => {
  const apiType = is_hidden ? "unhide" : "hide";
  try {
    const response = await actionApi().patch(`/users/${id}/${apiType}`);

    return response.data;
  } catch (error) {
    console.error(
      "Error hiding user:",
      error.response ? error.response.data : error.message
    );

    if (error.response) {
      throw new Error(error.response.data.message || "hide user failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
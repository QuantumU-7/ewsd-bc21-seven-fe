import axios from "axios";

export const loginService = async (username, password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        username,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

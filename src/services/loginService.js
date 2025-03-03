import axios from "axios";

export const loginService = async (username, password) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    // params.append("scope", "");
    // params.append("client_id", "string"); // Update if required
    // params.append("client_secret", "string"); // Update if required

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
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

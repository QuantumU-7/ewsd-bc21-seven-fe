import axios from "axios";

export const passwordResetService = async (email, otp_code, new_password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/forget-password/reset`,
      {
        email,
        otp_code,
        new_password,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Password Reset failed");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

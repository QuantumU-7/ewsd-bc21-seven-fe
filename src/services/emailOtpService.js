import axios from "axios";

export const emailOtpService = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/forget-password/initiate`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Email Otp Request failed"
      );
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

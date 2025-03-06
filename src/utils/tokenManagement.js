import Cookies from "js-cookie";

export const getAccessToken = () => {
  const token = Cookies.get("accesstoken");
  return token;
};

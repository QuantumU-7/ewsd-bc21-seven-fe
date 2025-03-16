import { TokenKeys } from "@/constants/tokenKeys";

export const getAccessToken = () => {
  const token = localStorage.getItem(TokenKeys.accesstoken);
  return token;
};

import { redirectLogin } from "@/api/config";
import Cookies from "js-cookie";
import { TokenKeys } from "@/constants/tokenKeys";

export const handleLogout = () => {
  Cookies.remove("accesstoken");
  Cookies.remove("refreshtoken");

  redirectLogin();
};

export const getUser = () => {
  const user = localStorage.getItem(TokenKeys.user);
  return user ? JSON.parse(user) : null;
}
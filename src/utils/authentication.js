import { redirectLogin } from "@/api/config";
import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("accesstoken");
  Cookies.remove("refreshtoken");

  redirectLogin();
};

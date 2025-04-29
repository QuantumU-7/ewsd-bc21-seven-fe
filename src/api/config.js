import { TokenKeys } from "@/constants/tokenKeys";
import { decodeToken } from "react-jwt";
import axios from "axios";

// Function to redirect to login
export const redirectLogin = () => {
  window.location.href = "/login";
};

// Function to get localStorage data
export const getLocalStorage = () => {
  const access_token = localStorage.getItem(TokenKeys.accesstoken);
  const refresh_token = localStorage.getItem(TokenKeys.refreshtoken);
  return { access_token, refresh_token };
};

let refreshPromise = null;
const clearPromise = () => (refreshPromise = null);

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

async function getRefreshToken() {
  const userData = getLocalStorage();
  const accessToken = userData.access_token;
  const refreshToken = userData.refresh_token;

  try {
    const response = await refreshApi.post(
      `/token/refresh`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      localStorage.setItem(
        TokenKeys.accesstoken,
        response.data.access_token
      );
      localStorage.setItem(
        TokenKeys.refreshtoken,
        response.data.refresh_token
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      };
    }
    return undefined;
  } catch (err) {
    if (err?.response?.status === 401) {
      redirectLogin();
      return { accessToken: null, refreshToken: null };
    }
    throw err;
  }
}

const actionApi = () => {
  const expireTime = Number(process.env.NEXT_PUBLIC_EXPIRE_TIME) || 300;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  instance.interceptors.request.use(
    async (config) => {
      let accessToken = localStorage.getItem(TokenKeys.accesstoken);
      let refreshToken = localStorage.getItem(TokenKeys.refreshtoken);

      if (!accessToken || !refreshToken) {
        redirectLogin();
        throw new Error("Access token not found.");
      }

      if (accessToken && refreshToken) {
        const userData = decodeToken(accessToken);

        if (
          userData &&
          Math.floor(new Date().getTime() / 1000) >
            Number(userData.exp) - expireTime
        ) {
          if (!refreshPromise) {
            refreshPromise = getRefreshToken().finally(clearPromise);
          }

          const tokens = await refreshPromise;
          if (tokens?.accessToken == null) {
            redirectLogin();
            throw new Error("Failed to refresh token");
          } else {
            accessToken = tokens.accessToken;
            refreshToken = tokens.refreshToken;
          }
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const accessToken = localStorage.getItem(TokenKeys.accesstoken);
      const refreshToken = localStorage.getItem(TokenKeys.refreshtoken);

      if (
        refreshToken &&
        accessToken &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        redirectLogin();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default actionApi;

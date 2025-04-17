import axios from "axios";

const getBaseURL = () => {
  const isDev = process.env.NODE_ENV === "development";
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  if (isDev && useMock) return process.env.NEXT_PUBLIC_API_MOCKING;
  return process.env.NEXT_PUBLIC_API_URL;
};

export const axiosDefault = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

axiosDefault.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
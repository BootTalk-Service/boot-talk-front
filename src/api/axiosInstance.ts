import axios from "axios";

const getBaseURL = () => {
  const isDev = process.env.NODE_ENV === "development";
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  if (isDev && useMock) return process.env.NEXT_PUBLIC_API_MOCKING;
  return process.env.NEXT_PUBLIC_API_URL;
};

export const axiosDefault = axios.create({
  baseURL: getBaseURL(),

  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true,
});

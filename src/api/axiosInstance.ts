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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzZXJ2aWNlVXNlcklkIjoiOTA2NSIsInVzZXJOYW1lIjoi6rmA6rCc67CcIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDQ3MzQyNDAsImV4cCI6MTc0NDgyMDY0MH0.kbe2kZ4fMARW8sUgEcxinli-A2bO1lwIPlNo5sfpANU",
  },
  withCredentials: true,
});

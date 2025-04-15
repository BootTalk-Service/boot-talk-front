import axios from "axios";

const getBaseURL = () => {
  const isDev = process.env.NODE_ENV === "development";
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "false";

  if (isDev && useMock) return process.env.NEXT_PUBLIC_API_MOCKING;
  return process.env.NEXT_PUBLIC_API_URL;
};

export const axiosDefault = axios.create({
  baseURL: getBaseURL(),

  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzZXJ2aWNlVXNlcklkIjoiODA1MCIsInVzZXJOYW1lIjoidGVzdDIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NDcxNzY2MCwiZXhwIjoxNzQ0ODA0MDYwfQ.c74rWAsODEuEPkddKENsXVNgSqkFQcMAmszlcF8xvCE",
  },
  withCredentials: true,
});

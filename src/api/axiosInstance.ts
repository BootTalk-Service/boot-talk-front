import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MOCKING || "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

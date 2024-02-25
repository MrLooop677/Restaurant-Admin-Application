import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // You can add default headers or other configurations here
});

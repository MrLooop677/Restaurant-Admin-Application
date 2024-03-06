import { axiosInstance } from "./baseapi";
export const createNewUser = async (user) => {
  const users = await axiosInstance.post("/users", user);
  return users;
};
export const logInUser = async (user) => {
  const users = await axiosInstance.get(`/users?${user}`);
  return users;
};

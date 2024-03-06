import { axiosInstance } from "./baseapi";

export const updateProfile = async (user) => {
  const users = await axiosInstance.patch(`/users/${user.id}`, user);
  return users;
};

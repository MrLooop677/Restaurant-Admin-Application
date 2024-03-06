import { axiosInstance } from "./baseapi";
export const addLocation = async (location) => {
  const resLocation = await axiosInstance.post(`/locations`, location);
  return resLocation;
};
export const getLocation = async (id) => {
  const resLocation = await axiosInstance.get(`/locations?userId=${id}`);
  return resLocation;
};

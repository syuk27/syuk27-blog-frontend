import { apiClient } from "../common";

const createUser = (user) => {
  return apiClient.post("/user/create", user);
};

const getUser = () => {
  return apiClient.get("/user/get");
};

const udpatePassword = (user) => {
  return apiClient.post("/user/change_password", user);
};

const deleteUser = (user) => {
  return apiClient.post("/user/delete", user);
};

export { createUser, getUser };

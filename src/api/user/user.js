import { apiClient } from "../common";

const excuteAuthenticate = (userEmail, password) => {
  return apiClient.post("/authenticate", { userEmail, password });
};

const registerUser = (user) => {
  return apiClient.post("/auth/authenticate", user);
};

const changePassword = (user) => {
  return apiClient.post("/auth/change_password", user);
};

const deleteUser = (user) => {
    return apiClient.post("/auth/delete", user);
  };

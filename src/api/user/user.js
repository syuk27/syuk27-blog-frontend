import { apiClient } from "../common";

const excuteAuthenticate = ({email, password}) => {
  return apiClient.post("/authenticate", { email, password });
};

const registerUser = (user) => {
  return apiClient.post("/auth/register", user);
};

const changePassword = (user) => {
  return apiClient.post("/auth/change_password", user);
};

const deleteUser = (user) => {
    return apiClient.post("/auth/delete", user);
  };

  export {
    excuteAuthenticate,
    registerUser,
  }
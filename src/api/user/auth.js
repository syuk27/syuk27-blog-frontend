import { apiClient } from "../common";

const excuteAuthenticate = ({ email, password }) => {
  return apiClient.post("/authenticate/login", { email, password });
};

const expiresAuthenticate = () => {
  return apiClient.post("/authenticate/logout");
};

export { excuteAuthenticate, expiresAuthenticate };

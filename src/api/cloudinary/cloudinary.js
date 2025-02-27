import axios from "axios";
import { apiClient } from "../common";

const uploadImageToCloudinary = async (formData) => {
  const cloudName = formData.get("cloudName");
  return axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );
};

const getCloudinarySignature = () => {
  return apiClient.get("/api/cloudinary/signature");
};

export { uploadImageToCloudinary, getCloudinarySignature };

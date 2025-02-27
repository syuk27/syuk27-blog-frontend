import axios from "axios";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import {
  uploadImageToCloudinary,
  getCloudinarySignature,
} from "../../api/cloudinary/cloudinary";

const ImageUploader = ({ onImageUpload, id }) => {
  return (
    // 이미지 업로드 버튼
    <label className="cursor-pointer flex items-center gap-2 text-blue-500">
      <ImagePlus size={20} />
      <span>이미지 추가</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onImageUpload(e, id)}
      />
    </label>
  );
};

const cloudinaryUpload = async (imageFile) => {
  // const [imageUrl, setImageUrl] = useState("");

  const formData = new FormData();
  console.log("asdasd1", imageFile);
  try {
    getCloudinarySignature().then((response) => {
      if (response.status === 200) {
        const data = response.data;
        formData.append("file", imageFile);
        formData.append("api_key", data.api_key);
        formData.append("timestamp", data.timestamp);
        formData.append("signature", data.signature);
        formData.append("cloudName", data.cloudName);

        return formData;
      }
      throw new Error("response status error");
    });

    return formData;
  } catch (error) {
    console.log("cloudinaryUpload", error);
  }
};

const handleImageUpload = async (formData) => {
  try {
    if (formData instanceof FormData && formData.has("cloudName")) {
      const response = await uploadImageToCloudinary(formData);
      console.log("handleImageUpload", response);
      if (response.status === 200) {
        return response.data.secure_url;
      }
    }

    return "";
  } catch (error) {
    console.log("handleImageUpload error", error);
    return "error";
  }
};

export { ImageUploader, cloudinaryUpload, handleImageUpload };

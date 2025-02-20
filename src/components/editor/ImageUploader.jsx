import { ImagePlus } from "lucide-react";

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

export default ImageUploader;

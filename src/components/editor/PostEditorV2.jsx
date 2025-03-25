import { useRef } from "react";
import CustomQuill from "./CustomQuill";

const PostEditorV2 = () => {
  const quillRef = useRef();
  const handleButtonClick = () => {};

  return (
    <CustomQuill
      className={`w-full p-2 border rounded-md resize-none font-semibold text-lg`}
      onPointerDown={handleButtonClick}
      placeholder="여기에 글을 입력하세요..."
      ref={quillRef}
      isImage={true}
    />
  );
};

export default PostEditorV2;

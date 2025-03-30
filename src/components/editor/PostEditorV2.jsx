import { useRef } from "react";
import CustomQuill from "./CustomQuill";

const PostEditorV2 = () => {
  const quillRef = useRef();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const handleButtonClick = () => {

  
    console.log("quillRef2222", quillRef)
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <label className="text-lg">📝 포스트 제목</label>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="w-full px-4 py-3 text-base font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          ref={titleRef}
        />

        <label className="text-lg">📝 포스트 요약</label>
        <textarea
          placeholder="내용을 간략히 작성해주세요."
          className="w-full px-4 py-3 text-base font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          ref={descriptionRef}
        />

        <label className="text-lg">📝 포스트 내용</label>
        <CustomQuill
          onPointerDown={handleButtonClick}
          ref={quillRef}
          isImage={true}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          모든 블록 저장
        </button>
      </div>
    </div>
  );
};

export default PostEditorV2;

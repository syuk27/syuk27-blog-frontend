import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import CustomQuill from "../CustomQuill";
import { CloudinaryUploader } from "../CloudinaryUploader";

const SortableItem = ({ id, post, onDelete, onImageUpload, quillRef }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
    
  console.log("SortableItem ref", quillRef);

  // 버튼 클릭 시 드래그 방지 (이벤트 전파 중지)
  const handleButtonClick = (event) => {
    event.stopPropagation(); // 버튼 클릭이 드래그를 방해하지 않도록 설정
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 border rounded-md bg-white shadow-md cursor-grab flex flex-col gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {/* 이미지 업로드 버튼 */}
      <CloudinaryUploader onImageUpload={onImageUpload} id={id} />

      {/* 이미지 미리보기 */}
      {post.image && (
        <div className="w-[53rem] h-[38rem] mx-auto">
          <img
            src={post.image}
            alt="Uploaded"
            className="max-w-full max-h-full object-cover rounded-md"
            width={post.image.width}
            height={post.image.height}
          />
        </div>
      )}

      {/* 글 입력 */}
      <CustomQuill
        className={`w-full p-2 border rounded-md resize-none font-semibold text-lg`}
        onPointerDown={handleButtonClick}
        placeholder="여기에 글을 입력하세요..."
        count={post.blockOrder}
        ref={quillRef}
      />

      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 flex items-center gap-2"
        onPointerDown={handleButtonClick}
      >
        <Trash2 size={20} />
        <span>삭제</span>
      </button>
    </div>
  );
};

export default SortableItem;

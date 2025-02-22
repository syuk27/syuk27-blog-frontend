import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import Toolbar from "./Toolbar";

const SortableItem = ({
  id,
  post,
  onChange,
  onDelete,
  onImageUpload,
  onFontSizeChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // 글자 드래그 후 글자 크기 변경 나중에 구현
  // const [content, setContent] = useState(post.content || "");

  // 버튼 클릭 시 드래그 방지 (이벤트 전파 중지)
  const handleButtonClick = (event) => {
    event.stopPropagation(); // 🔥 버튼 클릭이 드래그를 방해하지 않도록 설정
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 border rounded-md bg-white shadow-md cursor-grab flex flex-col gap-4"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {/* 이미지 업로드 버튼 */}
      <ImageUploader onImageUpload={onImageUpload} id={id} />

      {/* 이미지 미리보기 */}
      {post.image && (
        <>
          <img
            src={post.image}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-md"
          />
        </>
      )}

      {/* 글자 크기 조절 */}
      <Toolbar
        handleButtonClick={handleButtonClick}
        onFontSizeChange={onFontSizeChange}
        id={id}
      />

      {/* 글 입력 */}
      <textarea
        onPointerDown={handleButtonClick}
        className={`w-full p-2 border rounded-md resize-none ${post.fontSize}`}
        value={post.content || ""}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder="여기에 글을 입력하세요..."
      />

      {/* 📝 텍스트 입력 필드 (contentEditable) */}
      {/* <div
        contentEditable
        className="w-full p-2 border rounded-md resize-none focus:outline-none"
        onInput={(e) => onUpdateContent(id, e.target.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}

      {/* 삭제 버튼 */}
      <button
        onPointerDown={handleButtonClick}
        onClick={() => onDelete(id)}
        className="text-red-500 flex items-center gap-2"
      >
        <Trash2 size={20} />
        <span>삭제</span>
      </button>
    </div>
  );
};

export default SortableItem;

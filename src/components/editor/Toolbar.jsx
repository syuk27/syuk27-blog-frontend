export default function Toolbar({ onFontSizeChange, id}) {
    return (
    // 글자 크기 조절 버튼
    <div className="flex gap-2 items-center">
      <span className="text-gray-600">글자 크기:</span>
      <button
        onClick={() => onFontSizeChange(id, "text-sm")}
        className="px-2 py-1 border rounded-md"
      >
        작은 글씨
      </button>
      <button
        onClick={() => onFontSizeChange(id, "text-base")}
        className="px-2 py-1 border rounded-md"
      >
        기본
      </button>
      <button
        onClick={() => onFontSizeChange(id, "text-lg")}
        className="px-2 py-1 border rounded-md"
      >
        큰 글씨
      </button>
      <button
        onClick={() => onFontSizeChange(id, "text-xl")}
        className="px-2 py-1 border rounded-md"
      >
        더 큰 글씨
      </button>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const fontSize = [
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "40px",
];

// Quill의 Parchment 모듈을 사용하여 폰트 크기 설정 확장
const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSize;
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: Size.whitelist }], // 폰트 크기 옵션 추가
    [{ header: "1" }, { header: "2" }, { header: "3" }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
  ],
};

const formats = [
  "font",
  "size",
  "header",
  "list",
  "align",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
];

const CustomQuill = ({
  className,
  onChange,
  onPointerDown,
  placeholder,
  count,
}) => {
  if (!count) count = 1;

  const quillRef = useRef(null);
  const [pickerfontSize, setPickerFontSize] = useState("16px");
  const sizePickerId = "sizePicker_" + count;

  useEffect(() => {
    if (quillRef.current) {
      const quillContainer = quillRef.current.getEditor().container;

      const sizePicker = quillContainer?.parentElement.querySelector(
        ".ql-toolbar .ql-size.ql-picker .ql-picker-label"
      );
      sizePicker.id = sizePickerId;

      const sizePickerOptions = quillContainer?.parentElement.querySelectorAll(
        ".ql-toolbar .ql-size .ql-picker-item"
      );
      sizePickerOptions.forEach((item) => {
        item.addEventListener("click", (event) => {
          setPickerFontSize(event.target.dataset.value);
        });
      });
    }
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `#${sizePickerId}::before {
      content: '${pickerfontSize}' !important;
      }`;

    document.head.appendChild(style);
  }, [pickerfontSize]);

  const test = () => {
    console.log("Test")
  }

  return (
    <div className={className} onPointerDown={onPointerDown}>
      <ReactQuill
        onChange={(value) => onChange(value)}
        onCompositionStart={test}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        ref={quillRef}
        tabIndex={0}
      />
    </div>
  );
};

export default CustomQuill;

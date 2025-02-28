import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const fontSize = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
];

// Quill의 Parchment 모듈을 사용하여 폰트 크기 설정 확장
const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSize;
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: Size.whitelist }], // 폰트 크기 옵션 추가
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: "1" }, { header: "2" }, { header: "3" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
  ],
};

const formats = [
  "font",
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "align",
  "blockquote",
  "code-block",
];

const CustomQuill = ({ className, value, onChangeHandle, placeholder }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      console.log("quillRef.current1", quillRef.current);
      console.log("quillRef.current2", quillRef);

      const quillContainer = quillRef.current.getEditor().container;
      const sizePicker = quillContainer?.parentElement.querySelectorAll(
        ".ql-toolbar .ql-size .ql-picker-label"
      );

      const sizePickerOptions = quillContainer?.parentElement.querySelectorAll(
        ".ql-toolbar .ql-size .ql-picker-item"
      );
      console.log("sizePickerOptions", sizePickerOptions);
      sizePickerOptions.forEach((item) => {
        item.addEventListener("click", (event) => {
            console.log("sizePicker.style", sizePicker)
            console.log("event", event.target.dataset.value)
            sizePicker[0].style.setProperty(`::before {content: ${event.target.dataset.value} }`)
        });
      });
    }
  }, []);

  return (
    <div className={className}>
      <ReactQuill
        value={value}
        onChange={(value) => onChangeHandle(value)}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        ref={quillRef}
      />
    </div>
  );
};

export default CustomQuill;

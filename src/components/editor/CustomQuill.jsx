import React, { forwardRef, useEffect, useRef, useState } from "react";
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

const CustomQuill = forwardRef((props, ref) => {
  let { className, onPointerDown, placeholder, count } = props;

  if (!count) count = 1;

  // const quillRef = ref;
  const [pickerfontSize, setPickerFontSize] = useState("16px");
  const sizePickerId = "sizePicker_" + count;

  const refCurrent = Array.isArray(ref) ? ref.current[count] : ref.current;
  console.log("CustomQuill ref", ref);
  useEffect(() => {
    refCurrent.focus();

    if (refCurrent) {
      const quillContainer = refCurrent.getEditor().container;

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

  return (
    <div className={className} onPointerDown={onPointerDown}>
      <ReactQuill
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        ref={(el) => (ref.current[count] = el)}
        tabIndex={0}
      />
    </div>
  );
});

export default CustomQuill;

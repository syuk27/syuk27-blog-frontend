import React, { forwardRef, useEffect, useRef, useState } from "react";
import _ from "lodash";
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

const customModules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ size: Size.whitelist }], // 폰트 크기 옵션 추가
      // [{ header: "1" }, { header: "2" }, { header: "3" }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
    ],
  },
};

const customFormats = [
  "font",
  "size",
  // "header",
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

let modules;
let formats;

const ImageBlot = Quill.import("formats/image");
class CustomImageBlot extends ImageBlot {
  static create(value) {
    let node = super.create(value);
    node.setAttribute("src", value);
    node.setAttribute("draggable", true);

    node.ondragstart = (event) => {
      console.log("Drag Start: ");
      event.dataTransfer.setData("text/plain", node.getAttribute("src"));
      event.dataTransfer.effectAllowed = "move";
    };

    return node;
  }
}

// Quill.register("formats/custom-image", CustomImageBlot, true);

const CustomQuill = forwardRef((props, ref) => {
  let { onPointerDown, count, isImage, formData } = props;
  if (!count) count = 1;

  const quillRef = useRef(null);
  const draggedImageRef = useRef(null);
  const [pickerfontSize, setPickerFontSize] = useState("16px");
  const sizePickerId = "sizePicker_" + count;

  const handleImageUpload = (e) => {
    console.log("handleImageUpload", e);

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      console.log("file", file, input);
      if (file) {
        // const formData = new FormData();
        formData.append("files", file);

        // setQImages(formData);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", reader.result);

          quill.setSelection(range.index + 2);
          console.log("quill", quill);

          const quillRoot = quill?.root;
          setDraggableImages(quillRoot);
        };
      }
    };
  };

  const setDraggableImages = async (quillRoot) => {
    const imgs = quillRoot.querySelectorAll("img:not([draggable='true'])");
    imgs.forEach((img) => {
      console.log("img", img);
      img.style.width = "50%";
      img.style.margin = "0 auto";

      img.setAttribute("draggable", true);

      img.addEventListener("dragstart", (event) => {
        console.log("dragstart", event);

        draggedImageRef.current = img;
        event.dataTransfer.effectAllowed = "move";
        // draggedImage = event.target;
        // event.dataTransfer.setData("text/plain", draggedImage.outerHTML);
        // draggedImage.classList.add("dragging");
        // event.target.style.opacity = "0.5";
      });

      // img.addEventListener("dragend", (event) => {
      //   console.log("dragend", event);
      //   draggedImage.classList.remove("dragging");
      // });
    });

    quillRoot.addEventListener("drop", handleDropTest);
  };

  const handleDropTest = (event) => {
    console.log("handleDrop event", event);
    event.preventDefault();
    if (!draggedImageRef.current) return;

    const range = quillEditor.getSelection();
    if (!range) return;

    const imageUrl = draggedImageRef.current.getAttribute("src");

    draggedImageRef.current.parentNode.removeChild(draggedImageRef.current);

    console.log("handleDrop imageUrl", imageUrl);

    quillEditor.insertEmbed(range.index, "image", imageUrl);
    quillEditor.setSelection(range.index + 1);

    draggedImageRef.current = null;
  };

  modules = _.cloneDeep(customModules);
  formats = [...customFormats];

  if (isImage) {
    modules.toolbar.container.splice(2, 0, [{ image: "image" }]);
    formats.splice(2, 0, "image");

    modules.toolbar.handlers = {
      image: handleImageUpload,
    };
  }

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (Array.isArray(ref)) {
      ref.current[count] = quillRef.current;
      return;
    }

    if (typeof ref === "function") {
      ref(quillRef.current);
      return;
    }

    ref.current = quillRef.current;
  }, [ref, count]);

  useEffect(() => {
    if (!isImage) {
      quillRef.current.focus();
    }

    if (quillRef.current) {
      const quillEditor = quillRef.current?.getEditor();
      const quillContainer = quillEditor?.container;

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

  const handleDrop = (draggedImage, quillEditor) => {
    console.log("Drop Event Triggered");

    if (draggedImage) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      editor.insertEmbed(range.inex, "image", draggedImage.src);
      draggedImage.remove();
      draggedImage = null;
    }
  };

  const handleDrop2 = (event) => {
    console.log("handleDrop2", event);
    event.preventDefault();
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    const imageUrl = event.dataTransfer.getData("text/plain");
    if (imageUrl) {
      editor.insertEmbed(
        range ? range.index : editor.getLength(),
        "custom-image",
        imageUrl
      );
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `#${sizePickerId}::before {
      content: '${pickerfontSize}' !important;
      }`;

    document.head.appendChild(style);
  }, [pickerfontSize]);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      // onDrop={handleDrop2}
      // onPointerDown={onPointerDown}
    >
      <ReactQuill modules={modules} formats={formats} ref={quillRef} />
    </div>
  );
});

export default CustomQuill;

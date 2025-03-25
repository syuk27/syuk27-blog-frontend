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

const formats = [
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
  let { className, onPointerDown, placeholder, count, isImage } = props;
  if (!count) count = 1;

  const quillRef = useRef();
  const [pickerfontSize, setPickerFontSize] = useState("16px");
  const sizePickerId = "sizePicker_" + count;

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
    }

    ref.current = quillRef.current;
  }, [ref, count]);

  useEffect(() => {
    quillRef.current.focus();

    if (quillRef.current) {
      const quillEditor = quillRef.current?.getEditor();
      const quillRoot = quillEditor?.root;
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

      // const asd = new Quill(quillRef.current, {
      //   theme: "snow",
      // });

      // let draggedImage = null;
      // asd.root.addEventListener("dragstart", (event) => {
      //   console.log("dragstart", event);
      //   if (event.target.tagName === "IMG") {
      //     draggedImage = event.target;
      //     event.dataTransfer.setData("text/plain", draggedImage.outerHTML);
      //     event.target.style.opacity = "0.5";
      //   }
      // });

      // asd.root.addEventListener("dragover", (e) => e.preventDefault());

      // asd.root.addEventListener("drop", (event) => {
      //   event.preventDefault();
      //   console.log("asdasdas", event)
      //   handleDrop(draggedImage, quillEditor);
      // });

      let draggedImage = null;
      const setDraggableImages = async () => {
        const imgs = quillRoot.querySelectorAll("img");
        imgs.forEach((img) => {
          img.setAttribute("draggable", true);

          img.addEventListener("dragstart", (event) => {
            console.log("dragstart", event)
            draggedImage = event.target;
            event.dataTransfer.setData("text/plain", draggedImage.outerHTML);
            draggedImage.classList.add("dragging");
            // event.target.style.opacity = "0.5";
          });

          img.addEventListener("dragend", (event) => {
            console.log("dragend", event)
            draggedImage.classList.remove("dragging");
          });
        });
      };

      quillRoot.addEventListener("drop", (event) => {
        console.log("drop", event)
        event.preventDefault();
        const html = event.dataTransfer?.getData("text/plain");

        if (html) {
          const dragging = quillRoot.querySelector("img.dragging");
          if (dragging) dragging.remove();

          const range = document.createRangeFromPoint?.(
            event.clientX,
            event.clientY
          );

          if (range) {
            const frag = range.createContextualFragment(html);
            range.insertNode(frag);

            quillEditor.update();
            setTimeout(setDraggableImages, 0);
          }
        }
      });

      setTimeout(setDraggableImages, 500);

      quillEditor.on("text-change", (event) => {
        console.log("test-chg", event)
        setTimeout(setDraggableImages, 0);
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
        const formData = new FormData();
        formData.append("file", file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", reader.result);
        };
      }
    };
  };

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
    console.log("handleDrop2", event)
    event.preventDefault();
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    const imageUrl = event.dataTransfer.getData("text/plain");
    if (imageUrl) {
      editor.insertEmbed(range ? range.index : editor.getLength(), "custom-image", imageUrl);
    }
  };

  if (isImage) {
    modules.toolbar.container.splice(2, 0, [{ image: "image" }]);
    formats.splice(2, 0, "image");

    modules.toolbar.handlers = {
      image: handleImageUpload,
    };
    console.log("modules", modules);
  }

  return (
    <div
      // onDragOver={(e) => e.preventDefault()}
      // onDrop={handleDrop2}
      className={className}
      // onPointerDown={onPointerDown}
    >
      <ReactQuill
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        ref={quillRef}
        // tabIndex={0}
      />
    </div>
  );
});

export default CustomQuill;

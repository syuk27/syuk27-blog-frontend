import PostEditorV1 from "../../components/editor/PostEditorV1";
import PostEditorV2 from "../../components/editor/PostEditorV2";

export default function AdminEditorPage({version}) {
console.log("version", version)
  const editorComponentMap = {
    v1: <PostEditorV1 />,
    v2: <PostEditorV2 />,
  };

  return editorComponentMap[version];
}

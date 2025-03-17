import { useLocation } from "react-router-dom";
import PostDetailContentV1 from "../../components/posts/detail/PostDetailContentV1";
import { useEffect, useState } from "react";

const PostDetailPage = () => {
  const location = useLocation();
  const { post, version } = location.state;
  const [content, setContent] = useState("");

  const contentComponentMap = {
    v1: PostDetailContentV1,
  };

  useEffect(() => {
    setContent(contentComponentMap[version]({ data: post }));
  }, [version]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">
        {/* {post.author} • {post.date} */}
      </p>
      <hr className="mb-4" />
      {content}
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => window.history.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default PostDetailPage;

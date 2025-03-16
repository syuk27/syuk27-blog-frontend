import { useLocation } from "react-router-dom";

const PostDetailPage = () => {
  const location = useLocation();
  const post = location.state;

  console.log("PostDetailPage", post);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">
        {/* {post.author} • {post.date} */}
      </p>
      <hr className="mb-4" />
      <img src={post.postBlockList[0].cloudImg_url}></img>
      <div
        dangerouslySetInnerHTML={{ __html: post.postBlockList[0].content }}
        className="text-gray-800 leading-relaxed"
      />
      <img src={post.postBlockList[1].cloudImg_url}></img>
      <div
        dangerouslySetInnerHTML={{ __html: post.postBlockList[1].content }}
        className="text-gray-800 leading-relaxed"
      />

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

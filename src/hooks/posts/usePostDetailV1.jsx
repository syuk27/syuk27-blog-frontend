import { useNavigate } from "react-router-dom";
import { getAdminPostById } from "../../api/posts/post";

const usePostDetailV1 = () => {
  const navigate = useNavigate();

  const handleOnClick = async (postId) => {
    try {
      const response = await getAdminPostById(postId);
      if (response.status === 200) {
        navigate("/posts/detail", {
          state: { post: response.data, version: "v1" },
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return { handleOnClick };
};

export default usePostDetailV1;

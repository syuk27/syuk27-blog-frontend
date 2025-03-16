import { useNavigate } from "react-router-dom";
import { getAdminPostById } from "../../api/posts/post";
import { useState } from "react";

const usePostDetail = () => {
  const navigate = useNavigate();

  const handleOnClick = async (postId) => {
    try {
      const response = await getAdminPostById(postId);
      if (response.status === 200) {
        navigate("/posts/detail", { state: response.data });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return { handleOnClick };
};

export default usePostDetail;

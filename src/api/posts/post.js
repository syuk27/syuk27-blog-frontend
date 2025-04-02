import { apiClient } from "../common";

const createAdminPost = (post) => {
  return apiClient.post("/admin/posts", post);
};

const getAdminPosts = (page) => {
  return apiClient.get(`/admin/posts/${page}`);
};

const getAdminPostById = (postId) => {
  return apiClient.get(`/admin/posts/detail/${postId}`);
};

const createUserPost = (post) => {
  return apiClient.post("/user/posts", post);
};

const getUserPosts = (id, page) => {
  return apiClient.get(`/user/posts/${id}/${page}`);
};

const createAdminPostImage = (formData) => {
  return apiClient.post("/admin/posts/v2/image", formData, {
    Headers: { "Content-Type": "multipart/form-data" },
  });
};

export {
  createAdminPost,
  getAdminPosts,
  getAdminPostById,
  createUserPost,
  getUserPosts,
  createAdminPostImage,
};

import { apiClient } from "../common";

const createAdminPost = (post) => {
    return apiClient.post("/admin/posts", post);
}

const getAdminPosts = (page) => {
    return apiClient.get(`/admin/posts/${page}`);
}

const createUserPost = (post) => {
    return apiClient.post("/user/posts", post);
}

const getUserPosts = (id, page) => {
    return apiClient.get(`/user/posts/${id}/${page}`);
}

export {
    createAdminPost,
    getAdminPosts,
    createUserPost,
    getUserPosts,
}
import { apiClient } from "../common";


const createUserPost = (userPost) => {
    return apiClient.post("/user/posts", userPost);
}

const getUserPosts = (id, page) => {
    return apiClient.get(`/user/posts/${id}/${page}`);
}

export {
    createUserPost,
    getUserPosts,
}
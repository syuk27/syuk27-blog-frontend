import { apiClient } from "../common";


const createUserPost = (userPost) => {
    return apiClient.post("/user_posts", userPost);
}

const getUserPosts = (id, page) => {
    return apiClient.get(`/user_posts/${id}/${page}`);
}

export {
    createUserPost,
    getUserPosts,
}
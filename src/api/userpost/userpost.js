import { apiClient } from "../common";


const createUserPost = (userPost) => {
    return apiClient.post("/user_posts", userPost);
}

const getUserPosts = (id) => {
    return apiClient.get(`/user_posts/${id}`);
}

export {
    createUserPost,
    getUserPosts,
}
import { apiClient } from "../common";


const createUserPost = (userPost) => {
    return apiClient.post("/user_posts", userPost);
}

const getUserPost = (id) => {
    return apiClient.get(`/user_posts/${id}`);
}

export {
    createUserPost,
    getUserPost,
}
import api from "./axios";

export const getPublishedPosts = (page = 1, limit = 10) =>
  api.get("/api/posts", { params: { page, limit } }).then(res => res.data);

export const getPostById = (id) =>
  api.get(`/api/posts/${id}`).then(res => res.data);

export const getPostsByUser = (userId) =>
  api.get(`/api/users/${userId}/posts`).then(res => res.data);

export const createPostForUser = (postData) =>
  api.post(`/api/posts`, postData).then(res => res.data);

export const updatePost = (id, postData) =>
  api.put(`/api/posts/${id}`, postData).then(res => res.data);

export const deletePost = (id) =>
  api.delete(`/api/posts/${id}`).then(res => res.data);
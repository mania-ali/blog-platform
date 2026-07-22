import api from "./axios";

export const registerUser = (data) => api.post("/api/auth/register", data).then(res => res.data);
export const loginUser = (data) => api.post("/api/auth/login", data).then(res => res.data);
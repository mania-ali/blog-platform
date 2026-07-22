import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.userId;
  } catch {
    return null;
  }
}
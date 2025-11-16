// assets/js/api/auth.js
import { apiFetch } from "./config.js";

// REGISTER
export async function registerUser(data) {
  // data: { full_name, username, email, password }
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// LOGIN
export async function loginUser(data) {
  // data: { email, password }
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// LOGOUT
export async function logoutUser() {
  // Stateless logout - backend acknowledges; client should remove token
  return apiFetch("/auth/logout", { method: "POST" });
}

// assets/js/api/dashboard.js
import { apiFetch } from "./config.js";

// DASHBOARD ADMIN
export async function getAdminOverview() {
  return apiFetch("/admin/overview", { method: "GET" });
}

export async function getAdminTransactions() {
  return apiFetch("/admin/transactions", { method: "GET" });
}

export async function getPublishedCourses() {
  return apiFetch("/courses", { method: "GET" });
}

// ===== USERS =====
// Note: backend may not have GET /admin/users yet, so we'll handle this gracefully
export async function getAllUsers() {
  try {
    return apiFetch("/admin/users", { method: "GET" });
  } catch (err) {
    console.warn("GET /admin/users not available, returning empty", err);
    return { users: [] };
  }
}

// Get user by ID
export async function getUserById(id) {
  return apiFetch(`/admin/users/${id}`, { method: "GET" });
}

// Update user
export async function updateUser(id, payload) {
  return apiFetch(`/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Delete user
export async function deleteUser(id) {
  return apiFetch(`/admin/users/${id}`, { method: "DELETE" });
}

// FEEDBACK
export async function getAllFeedback(
  courseId = null,
  ratingMin = null,
  ratingMax = null
) {
  let endpoint = "/admin/feedback";
  const params = new URLSearchParams();
  if (courseId) params.append("course_id", courseId);
  if (ratingMin) params.append("min_rating", ratingMin);
  if (ratingMax) params.append("max_rating", ratingMax);
  if (params.toString()) endpoint += "?" + params.toString();
  return apiFetch(endpoint, { method: "GET" });
}

export async function getFeedbackByCourse(courseId) {
  return apiFetch(`/admin/courses/${courseId}/feedback`, { method: "GET" });
}

// ===== EARNINGS (INSTRUCTOR) =====
export async function getInstructorEarnings() {
  return apiFetch("/instructor/earnings", { method: "GET" });
}

// ===== PROFILE =====
export async function getProfile() {
  return apiFetch("/auth/me", { method: "GET" });
}

// ===== DELETE FEEDBACK =====
export async function deleteFeedback(feedbackId) {
  // Note: backend may not have DELETE /admin/feedback/:id yet
  try {
    return apiFetch(`/admin/feedback/${feedbackId}`, { method: "DELETE" });
  } catch (err) {
    console.warn("DELETE feedback not available on backend", err);
    throw err;
  }
}

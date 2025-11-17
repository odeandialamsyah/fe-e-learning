// assets/js/api/instructor.js
import { apiFetch } from "./config.js";

export async function getInstructorEarnings() {
  return apiFetch("/instructor/earnings", { method: "GET" });
}

export async function getInstructorCourses() {
  return apiFetch("/instructor/courses", { method: "GET" });
}

export async function getInstructorFeedback() {
  return apiFetch("/instructor/feedback", { method: "GET" });
}

export async function getProfile() {
  return apiFetch("/auth/me", { method: "GET" });
}

export async function createCourse(courseData) {
  return apiFetch("/instructor/courses", {
    method: "POST",
    body: JSON.stringify(courseData),
  });
}

export async function updateCourse(courseId, courseData) {
  return apiFetch(`/instructor/courses/${courseId}`, {
    method: "PUT",
    body: JSON.stringify(courseData),
  });
}

export async function deleteCourse(courseId) {
  return apiFetch(`/instructor/courses/${courseId}`, { method: "DELETE" });
}

export async function addModule(courseId, formData) {
  // formData should be a FormData object with title, order, and optional pdf file
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(
    `http://127.0.0.1:8080/api/instructor/courses/${courseId}/modules`,
    {
      method: "POST",
      headers,
      body: formData,
    }
  );

  if (!response.ok) {
    let errorMsg = `API error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorData.message || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  return response.json();
}

export async function editModule(courseId, moduleId, formData) {
  // formData should be a FormData object with title, order, and optional pdf file
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(
    `http://127.0.0.1:8080/api/instructor/courses/${courseId}/modules/${moduleId}`,
    {
      method: "PUT",
      headers,
      body: formData,
    }
  );

  if (!response.ok) {
    let errorMsg = `API error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorData.message || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  return response.json();
}

export async function deleteModule(courseId, moduleId) {
  return apiFetch(`/instructor/courses/${courseId}/modules/${moduleId}`, {
    method: "DELETE",
  });
}

export async function getCoursDetail(courseId) {
  return apiFetch(`/courses/${courseId}`, { method: "GET" });
}

export async function publishCourse(courseId) {
  return apiFetch(`/admin/courses/${courseId}/publish`, { method: "PUT" });
}

export async function unpublishCourse(courseId) {
  return apiFetch(`/admin/courses/${courseId}/unpublish`, { method: "PUT" });
}

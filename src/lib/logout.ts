export const clearAuthStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth-storage");
  localStorage.removeItem("user-storage");
  localStorage.removeItem("readNotificationIds");
  window.location.href = "/";
};

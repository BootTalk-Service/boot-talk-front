export const clearAuthStorage = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("readNotificationIds");

  // 쿠키 삭제 (만료일을 과거로 설정)
  document.cookie =
    "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // 홈페이지로 리디렉션
  window.location.href = "/";
};

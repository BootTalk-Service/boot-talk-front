"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("access_token", token);

      console.log("token 저장 완료:", token);

      // URL 정리 (token 제거)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      console.warn("URL에서 token을 찾을 수 없습니다.");
    }
  }, []);

  return <h1>로그인 처리 중입니다...</h1>;
}

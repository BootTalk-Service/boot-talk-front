"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("access_token", token);

      // URL 정리 (token 제거)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return <h1>로그인 처리 중입니다...</h1>;
}

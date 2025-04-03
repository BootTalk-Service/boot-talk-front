"use client";

import React from "react";
import { useGetExample } from "@/hooks/useGetExample";

export default function ExamplePage() {
  const { example } = useGetExample();

  console.log("컴포넌트 상태:", { example });

  return (
    <div className="container">
      <h1>Example Page</h1>
      <div>
        {example?.map((item) => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>이름: {item.name}</p>
            <img src="http://localhost:9090/upload/1743573620885-3e132e0b-a1e9-4f38-b711-19ec21fc5199.jpeg" />
          </div>
        ))}
      </div>
    </div>
  );
}

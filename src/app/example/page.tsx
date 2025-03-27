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
          </div>
        ))}
      </div>
    </div>
  );
}

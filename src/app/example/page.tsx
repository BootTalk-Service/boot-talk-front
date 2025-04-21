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
        <div key={example.item.id}>
          <p>ID: {example.item.id}</p>
          <p>이름: {example.item.name}</p>
        </div>
      </div>
    </div>
  );
}

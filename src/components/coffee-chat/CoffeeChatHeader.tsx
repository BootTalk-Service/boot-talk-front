import React from "react";

const CoffeeChatHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-amber-950">커피챗</h1>
      <button className="px-4 py-2 bg-amber-950 text-white rounded-lg hover:bg-amber-900 transition-colors">
        커피챗 등록
      </button>
    </div>
  );
};

export default CoffeeChatHeader;

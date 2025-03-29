"use client";

import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <section
      className="w-full pt-40 pb-20 flex justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/main-search-bg.jpg')" }} // public 폴더 기준
    >
      <div className="relative w-[480px] max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content " size={20} />
        <input
          type="text"
          placeholder="부트캠프명 또는 키워드를 검색해보세요"
          className="input input-bordered w-full rounded-full text-center py-6 text-base bg-base-100 bg-opacity-90 focus:outline-none"
        />
      </div>
    </section>
  );
};

export default SearchSection;

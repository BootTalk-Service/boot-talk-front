"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Next.js의 useRouter 사용
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

// 자동완성 검색 결과 타입 정의
interface BootcampSuggestion {
  bootcampId: number; // 부트캠프 ID
  bootcampName: string; // 부트캠프 이름
}

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BootcampSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // 페이지 이동을 위한 useRouter 훅

  // 자동완성 결과 가져오기
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosDefault.get(
          `${END_POINT.BOOTCAMPS_AUTOCOMPLETE}?query=${encodeURIComponent(query)}`
        );
        console.log("자동완성 응답:", response.data);
        setSuggestions(response.data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("자동완성 결과 가져오기 실패:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // API 호출 디바운싱 (300ms)
    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: BootcampSuggestion) => {
    router.push(END_POINT.BOOTCAMP_DETAIL(String(suggestion.bootcampId)));
    setQuery(suggestion.bootcampName);
    setIsOpen(false);
  };


  return (
    <section
      className="w-full pt-40 pb-20 flex justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/main-search-bg.jpg')" }}
    >
      <div className="relative w-[480px] max-w-xl z-[9999]">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content" size={20} />
        <input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim().length > 0 && setIsOpen(true)}
            type="text"
            placeholder="부트캠프명 또는 키워드를 검색해보세요"
            className={`w-full py-5 pl-13 pr-4 bg-white text-sm border border-gray-300 focus:outline-none 
            ${isOpen ? "rounded-t-2xl rounded-b-none" : "rounded-full"} shadow-md`}
        />

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full bg-white border border-t-0 border-gray-300 rounded-b-xl shadow-md"
          >
            {isLoading ? (
              <div className="px-4 py-2 text-center">
                <div className="w-5 h-5 mx-auto border-t-2 border-b-2 border-amber-950 rounded-full animate-spin"></div>
              </div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                  key={suggestion.bootcampId} // courseId → bootcampId 변경
                  onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-left truncate"
                  >
                    {suggestion.bootcampName}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-gray-500 text-center">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;

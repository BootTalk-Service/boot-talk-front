"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { STATIC_FILTER_OPTIONS } from "./bootcampFilters";
import { RotateCcw } from "lucide-react";

interface FilterButtonsProps {
  categoryOptions: string[];
}

const FilterButtons = ({ categoryOptions = [] }: FilterButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // URL에서 현재 선택된 필터 값 가져오기
  const getFiltersFromURL = () => {
    const params = new URLSearchParams(searchParams.toString());
    const filters: Record<string, string> = {};
    
    // 정적 필터 키 처리
    STATIC_FILTER_OPTIONS.forEach(filter => {
      const value = params.get(filter.key);
      if (value) filters[filter.key] = value;
    });
    
    // 직무 필터 처리
    const category = params.get('category');
    if (category) filters.category = category;
    
    return filters;
  };

  const selectedFilters = getFiltersFromURL();

  const handleSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // 이미 선택된 값과 같으면 필터 제거, 아니면 필터 추가
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    // URL 업데이트
    router.push(`?${params.toString()}`);
    setOpenDropdown(null);
  };

  const clearAllFilters = () => {
    router.push('/'); // 모든 쿼리 파라미터 제거
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // 정적 필터와 동적 직무 필터 결합
  const allFilters = [
    ...STATIC_FILTER_OPTIONS,
    { key: "category", label: "직무", options: categoryOptions || [] },
  ];

  return (
    <div className="flex justify-center w-full relative z-10">
      
      <div className="flex flex-wrap gap-3 items-center justify-center px-4 py-6">
        {allFilters.map((filter) => (
          <div
            className="relative flex items-center gap-1"
            key={filter.label}
            ref={(el) => {
              dropdownRefs.current[filter.label] = el;
            }}
          >
            <div
              role="button"
              onClick={() =>
                setOpenDropdown(openDropdown === filter.label ? null : filter.label)
              }
              className={`btn btn-sm rounded-full min-w-[90px] whitespace-nowrap pt-1 ${
                selectedFilters?.[filter.key]
                  ? "bg-amber-900 text-white"
                  : "btn-outline border-neutral-400"
              }`}
            >
              {selectedFilters?.[filter.key] || filter.label}
            </div>

            {openDropdown === filter.label && (
              <ul className="absolute top-full left-0 mt-1 menu p-2 shadow bg-white rounded-box w-40 z-50">
                {filter.options.map((option) => (
                  <li key={option}>
                    <a onClick={() => handleSelect(filter.key, option)}>{option}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* 초기화 버튼 (같은 라인 내 마지막 요소로 배치) */}
        <div className="flex items-center">
          <button
            onClick={clearAllFilters}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
            aria-label="전체 필터 초기화"
          >
            <RotateCcw className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;

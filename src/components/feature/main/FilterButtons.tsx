"use client";

import { FilterButtonsProps } from "@/types/FilterButtons";
import { useState, useEffect, useRef } from "react";
import { FILTER_OPTIOMS } from "@/components/feature/main/bootcampFilters";


const FilterButtons = ({ onFilterChange }: FilterButtonsProps) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSelect = (label: string, option: string) => {
    const newFilters = { ...selectedFilters, [label]: option };
    setSelectedFilters(newFilters);
    setOpenDropdown(null);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);


  return (
    <div className="flex flex-wrap justify-center gap-3 px-4 py-6">
      {FILTER_OPTIOMS.map((filter) => (
        <div
        className="relative flex items-center gap-1"
        key={filter.label}
        ref={(el) => {
          dropdownRefs.current[filter.label] = el;
        }}
      >

          {/* filter */}
          <div
            role="button"
            onClick={() =>
              setOpenDropdown(openDropdown === filter.label ? null : filter.label)
            }
            className={`btn btn-sm rounded-full min-w-[90px] ${
              selectedFilters[filter.label]
                ? "bg-amber-950 text-white"
                : "btn-outline border-neutral-400"
            }`}
          >
            {selectedFilters[filter.label] || filter.label}
          </div>

          {/* 초기화 버튼 */}
          {filter.label === "평점" && (
            <button
              onClick={clearAllFilters}
              className="ml-2 border border-gray-300 rounded-full p-1 hover:bg-gray-100"
              aria-label="전체 필터 초기화"
            >
              {/* JSX 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-black"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* 드롭다운 */}
          {openDropdown === filter.label && (
            <ul className="absolute top-full left-0 mt-1 menu p-2 shadow bg-white rounded-box w-40 z-10">
              {filter.options.map((option) => (
                <li key={option}>
                  <a onClick={() => handleSelect(filter.label, option)}>{option}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;

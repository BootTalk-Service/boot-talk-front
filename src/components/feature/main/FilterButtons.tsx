"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { STATIC_FILTER_OPTIONS } from "./bootcampFilters";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";

interface FilterButtonsProps {
  categoryOptions: string[];
}

const FilterButtons = ({ categoryOptions = [] }: FilterButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getFiltersFromURL = () => {
    const params = new URLSearchParams(searchParams.toString());
    const filters: Record<string, string> = {};
    
    STATIC_FILTER_OPTIONS.forEach(filter => {
      const value = params.get(filter.key);
      if (value) filters[filter.key] = value;
    });
    
    const category = params.get('category');
    if (category) filters.category = category;
    
    return filters;
  };

  const selectedFilters = getFiltersFromURL();

  const handleSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    router.push(`?${params.toString()}`);
    setOpenDropdown(null);
  };

  const clearAllFilters = () => {
    router.push('/');
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

  const allFilters = [
    ...STATIC_FILTER_OPTIONS,
    { key: "category", label: "직무", options: categoryOptions || [] },
  ];

  return (
    <div className="flex justify-center w-full relative z-50">
      
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
              className={clsx(
                "btn btn-sm rounded-full min-w-[72px] sm:min-w-[90px]",
                selectedFilters?.[filter.key]
                  ? "bg-amber-900 text-white"
                  : "btn-outline border-neutral-400"
              )}
            >
              {selectedFilters?.[filter.key] || filter.label}
            </div>

            {openDropdown === filter.label && (
              <div
              className={clsx(
                "absolute top-full left-0 mt-1 shadow bg-white rounded-lg z-50 max-h-60 overflow-y-auto overflow-x-hidden",
                filter.label === "직무" ? "w-44 sm:w-52" : "w-36 sm:w-40"
              )}
            >
                <ul className="menu menu-compact p-2">
                  {filter.options.map((option) => (
                    <li key={option}>
                    <a
                      onClick={() => handleSelect(filter.key, option)}
                      className="text-sm py-2 px-4 hover:bg-gray-100 rounded-md truncate"
                    >
                      {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* 초기화 버튼 */}
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

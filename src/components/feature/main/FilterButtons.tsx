"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { STATIC_FILTER_OPTIONS } from "./bootcampFilters";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";

interface FilterButtonsProps {
  categoryOptions: string[];
}

type Option = { label: string; value: string };

const FilterButtons = ({ categoryOptions = [] }: FilterButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getFiltersFromURL = (): Record<string, string> => {
    const params = new URLSearchParams(searchParams.toString());
    const filters: Record<string, string> = {};

    STATIC_FILTER_OPTIONS.forEach((f) => {
      const v = params.get(f.key);
      if (v) filters[f.key] = v;
    });

    const cat = params.get("category");
    if (cat) filters.category = cat;

    return filters;
  };

  const selectedFilters = getFiltersFromURL();

  const handleSelect = (key: string, option: Option) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(key) === option.value) {
      params.delete(key);
    } else {
      params.set(key, option.value);
    }

    router.push(`?${params.toString()}`);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [openDropdown]);

  const allFilters: { key: string; label: string; options: Option[] }[] = [
    ...STATIC_FILTER_OPTIONS.map((f) => ({
      key: f.key,
      label: f.label,
      options: f.options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
      ),
    })),
    {
      key: "category",
      label: "직무",
      options: categoryOptions.map((c) => ({ label: c, value: c })),
    },
  ];

  const clearAllFilters = () => {
    router.push("/");
    setOpenDropdown(null);
  };

  return (
    <div className="flex justify-center w-full relative z-50">
      <div className="flex flex-wrap gap-3 items-center justify-center px-4 py-6">
        {allFilters.map((filter) => (
          <div
            key={filter.key}
            ref={(el) => {
              dropdownRefs.current[filter.key] = el;
            }}
            className="relative flex items-center gap-1"
          >
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === filter.key ? null : filter.key)
              }
              className={clsx(
                "btn btn-sm rounded-full min-w-[72px] sm:min-w-[90px]",
                selectedFilters[filter.key]
                  ? "bg-amber-900 text-white"
                  : "btn-outline border-neutral-400"
              )}
            >
              {
                filter.options.find(
                  (o) => o.value === selectedFilters[filter.key]
                )?.label ?? filter.label
              }
            </button>

            {openDropdown === filter.key && (
              <div
                className={clsx(
                  "absolute top-full left-1/2 -translate-x-1/2 mt-1 shadow bg-white rounded-lg z-50 max-h-60 overflow-y-auto scrollbar-thin",
                  "overflow-x-hidden",
                  filter.key === "category"
                    ? "w-60 sm:w-48"
                    : filter.key === "region" || filter.key === "rating"
                      ? "w-28 sm:w-25"
                      : "w-28 sm:w-28"
                )}
              >
                <ul className="menu menu-compact p-2">
                  {filter.options.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => handleSelect(filter.key, option)}
                        className="w-full text-left text-sm py-2 px-4 hover:bg-gray-100 rounded-md whitespace-normal break-words"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={clearAllFilters}
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
          aria-label="전체 필터 초기화"
        >
          <RotateCcw className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;

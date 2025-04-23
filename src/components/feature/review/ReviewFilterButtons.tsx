"use client";

import { useEffect, useState, useRef } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import clsx from "clsx";
import { RotateCcw } from "lucide-react";

interface FilterType {
  category?: string;
  date?: string;
}

export const ReviewFilterButtons = ({
  onFilterChangeAction,
}: {
  onFilterChangeAction: (updater: (prev: FilterType) => FilterType) => void;
}) => {
  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<"category" | "date" | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterType>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await axiosDefault.get(END_POINT.BOOTCAMP_JOB_ROLES);
        setJobRoles(res.data || []);
      } catch {
      }
    };
    fetchJobRoles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleFilterSelect = (key: "category" | "date", value: string) => {
    const updated = selectedFilters[key] === value ? undefined : value;
    setSelectedFilters((prev) => ({ ...prev, [key]: updated }));
    onFilterChangeAction((prev) => ({ ...prev, [key]: updated }));
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChangeAction(() => ({}));
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* 직무 필터 */}
      <div
        className="relative"
        ref={(el: HTMLDivElement | null) => {
          dropdownRefs.current["category"] = el;
        }}        
      >
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "category" ? null : "category")
          }
          className={clsx(
            "btn btn-sm rounded-full min-w-[90px] px-4",
            selectedFilters.category
              ? "bg-amber-900 text-white"
              : "btn-outline border-neutral-400"
          )}
        >
          {selectedFilters.category || "직무"}
        </button>

        {openDropdown === "category" && (
          <div className="absolute top-full left-0 mt-1 shadow bg-white rounded-lg z-50 max-h-60 w-44 sm:w-52 overflow-auto">
            <ul className="menu menu-compact p-2">
              {jobRoles.length === 0 && (
                <li>
                  <span className="text-sm text-gray-400 px-4 py-2">
                    불러올 수 없습니다.
                  </span>
                </li>
              )}
              {jobRoles.map((role) => (
                <li key={role}>
                  <button
                    type="button"
                    onClick={() => handleFilterSelect("category", role)}
                    className={clsx(
                      "text-sm block w-full text-left py-2 px-4 hover:bg-gray-100 rounded",
                      selectedFilters.category === role &&
                        "bg-amber-100 text-amber-900 font-semibold"
                    )}
                  >
                    {role}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 정렬 필터 */}
      <div
        className="relative"
        ref={(el) => {
          dropdownRefs.current["date"] = el;
        }}
      >
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(openDropdown === "date" ? null : "date")
          }
          className={clsx(
            "btn btn-sm rounded-full min-w-[90px] px-4",
            selectedFilters.date
              ? "bg-amber-900 text-white"
              : "btn-outline border-neutral-400"
          )}
        >
          {selectedFilters.date || "정렬"}
        </button>

        {openDropdown === "date" && (
          <div className="absolute top-full left-0 mt-1 shadow bg-white rounded-lg z-50 max-h-60 w-40 overflow-auto">
            <ul className="menu menu-compact p-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleFilterSelect("date", "최신순")}
                  className={clsx(
                    "text-sm block w-full text-left py-2 px-4 hover:bg-gray-100 rounded",
                    selectedFilters.date === "최신순" &&
                      "bg-amber-100 text-amber-900 font-semibold"
                  )}
                >
                  최신순
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleFilterSelect("date", "오래된순")}
                  className={clsx(
                    "text-sm block w-full text-left py-2 px-4 hover:bg-gray-100 rounded",
                    selectedFilters.date === "오래된순" &&
                      "bg-amber-100 text-amber-900 font-semibold"
                  )}
                >
                  오래된순
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 초기화 버튼 */}
      <button
        type="button"
        onClick={clearFilters}
        className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
        aria-label="전체 필터 초기화"
      >
        <RotateCcw className="w-4 h-4 text-black" />
      </button>
    </div>
  );
};
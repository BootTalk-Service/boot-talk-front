'use client';

import { useEffect, useState, useRef } from 'react';
import { axiosDefault } from '@/api/axiosInstance';
import { END_POINT } from '@/constants/endPoint';
import clsx from 'clsx';
import { ChevronDown, RotateCcw } from 'lucide-react';

interface FilterType {
  category?: string;
  date?: string;
}

export const ReviewFilterButtons = ({
  onFilterChange,
  totalCount = 0,
}: {
  onFilterChange: (updater: (prev: FilterType) => FilterType) => void;
  totalCount?: number;
}) => {
  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<'category' | 'date' | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterType>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await axiosDefault.get(END_POINT.BOOTCAMP_JOB_ROLES);
        setJobRoles(res.data || []);
      } catch (error) {
        console.error('직무 데이터 로드 실패:', error);
      }
    };
    fetchJobRoles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleFilterSelect = (key: 'category' | 'date', value: string) => {
    const updatedValue = selectedFilters[key] === value ? undefined : value;

    setSelectedFilters((prev) => ({
      ...prev,
      [key]: updatedValue,
    }));

    onFilterChange((prev) => ({
      ...prev,
      [key]: updatedValue,
    }));

    setOpenDropdown(null);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange(() => ({}));
    setOpenDropdown(null);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        {/* 왼쪽 필터 버튼들 */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 직무 필터 */}
          <div
            className="relative flex items-center"
            ref={(el) => (dropdownRefs.current['category'] = el)}
          >
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'category' ? null : 'category')
              }
              className={clsx(
                'btn btn-sm rounded-full min-w-[70px] px-4 flex justify-center items-center',
                selectedFilters.category !== undefined
                  ? 'bg-amber-900 text-white'
                  : 'btn-outline border-neutral-400'
              )}
            >
              {selectedFilters.category !== undefined
                ? selectedFilters.category || '모든 직무'
                : '직무'}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
  
            {openDropdown === 'category' && (
              <div className="absolute top-full left-0 mt-1 shadow bg-white rounded-lg z-50 max-h-60 overflow-y-auto w-44 sm:w-52">
                <ul className="menu p-2">
                  <li>
                    <div
                      onClick={() => handleFilterSelect('category', '')}
                      className="block w-full px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      모든 직무
                    </div>
                  </li>

                  {jobRoles.map((role) => (
                    <li key={role}>
                      <div
                        onClick={() => handleFilterSelect('category', role)}
                        className="block w-full px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        {role}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
  
          {/* 날짜 필터 */}
          <div
            className="relative flex items-center"
            ref={(el) => (dropdownRefs.current['date'] = el)}
          >
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'date' ? null : 'date')
              }
              className={clsx(
                'btn btn-sm rounded-full min-w-[70px] px-4 flex justify-center items-center',
                selectedFilters.date !== undefined
                  ? 'bg-amber-900 text-white'
                  : 'btn-outline border-neutral-400'
              )}
            >
              {selectedFilters.date !== undefined
                ? selectedFilters.date || '최신순'
                : '날짜'}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
  
            {openDropdown === 'date' && (
              <div className="absolute top-full left-0 mt-1 shadow bg-white rounded-lg z-50 max-h-60 overflow-y-auto w-40">
                <ul className="menu p-2">
                  <li>
                    <div
                      onClick={() => handleFilterSelect('date', '')}
                      className="block w-full px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      최신순
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => handleFilterSelect('date', '오래된순')}
                      className="block w-full px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      오래된순
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
  
          {/* 초기화 버튼 */}
          <button
            onClick={clearFilters}
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
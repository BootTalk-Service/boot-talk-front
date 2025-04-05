'use client';

import { useEffect } from 'react';
import { X } from "lucide-react";

interface DropDownFilterProps {
  label: string;
  options: string[];
  selectedValue?: string;
  isOpen: boolean;
  onSelect: (option: string) => void;
  onToggle: () => void;
  onClear?: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const DropDownFilter = ({
  label,
  options,
  selectedValue,
  isOpen,
  onSelect,
  onToggle,
  onClear,
  dropdownRef
}: DropDownFilterProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, dropdownRef, onToggle]);

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-1">
      <div
        role="button"
        onClick={onToggle}
        className={`inline-flex items-center px-3 py-1 text-sm rounded-full border transition whitespace-nowrap
          ${selectedValue
            ? 'bg-[#FFF3E0] text-[#5D4037] border-[#FFD180]'
            : 'bg-white text-neutral-700 border-neutral-300'}`}
      >
        {selectedValue || label}
      </div>

      {label === '날짜' && onClear && (
        <button
          onClick={onClear}
          className="ml-2 border border-gray-300 rounded-full p-1 hover:bg-gray-100"
          aria-label="전체 필터 초기화"
        >
          <X className="w-4 h-4"/>
        </button>
      )}

      {isOpen && (
        <ul className="absolute top-full left-0 mt-1 p-2 shadow bg-white rounded-md w-40 z-10 text-sm">
          {options.map((option) => (
            <li key={option}>
              <button
                onClick={() => onSelect(option)}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

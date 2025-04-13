'use client';

import { useState, useRef } from 'react';
import { DropDownFilter } from '@/components/common/DropDownFilter';

const HARDCODED_JOB_ROLES = [
  "응용sw엔지니어링",
  "스마트설계제어",
  "정보보호 관리·운영",
  "SW제품기획",
  "빅데이터분석",
  "인공지능서비스개발",
  "UI/UX엔지니어링",
  "보안엔지니어링",
  "직무용응기기하드웨어개발",
  "디지털비즈니스지원서비스",
  "반도체개발",
  "클라우드인프라스트럭처엔지니어링",
  "빅데이터플랫폼구축",
  "DB엔지니어링",
  "클라우드솔루션아키텍처",
  "IoT시스템통합"
];

const DATE_OPTIONS = ["최신순", "오래된순"];

type FilterMap = { [key: string]: string };
type Props = { onFilterChange: (filters: FilterMap) => void };

export const ReviewFilterButtons = ({ onFilterChange }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterMap>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    직무: useRef(null),
    날짜: useRef(null),
  };

  const filterOptions = [
    { label: '직무', options: HARDCODED_JOB_ROLES },
    { label: '날짜', options: DATE_OPTIONS }
  ];

  const handleSelect = (label: string, option: string) => {
    const newFilters = { ...selectedFilters, [label]: option };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 px-0 py-6">
      {filterOptions.map(({ label, options }) => (
        <DropDownFilter
          key={label}
          label={label}
          options={options}
          selectedValue={selectedFilters[label]}
          isOpen={openDropdown === label}
          onSelect={(option) => handleSelect(label, option)}
          onToggle={() => setOpenDropdown(openDropdown === label ? null : label)}
          onClear={label === '날짜' ? clearAllFilters : undefined}
          dropdownRef={dropdownRefs[label]}
        />
      ))}
    </div>
  );
};
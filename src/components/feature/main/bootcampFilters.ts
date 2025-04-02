type FILTER_OPTIONS = {
  label: string;
  options: string[];
};

export const FILTER_OPTIONS = [
  { label: "지역", options: ["서울", "부산", "대전", "대구", "온라인"] },
  { label: "직무", options: ["프론트엔드", "백엔드", "디자인", "데이터"] },
  { label: "기간", options: ["4주 미만", "4~12주", "12주 이상"] },
  { label: "평점", options: ["3.0 이상", "4.0 이상", "4.5 이상"] },
];
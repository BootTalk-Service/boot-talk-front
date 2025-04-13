export const STATIC_FILTER_OPTIONS = [
  { key: "region", label: "지역", options: ["서울", "부산", "인천", "대전", "대구", "온라인"] },
  { 
    key: "duration", 
    label: "기간", 
    options: ["4주 미만", "4~12주", "12주 이상"],
    valueMap: {
      "4주 미만": "1",
      "4~12주": "2",
      "12주 이상": "3"
    }
  },
  { 
    key: "minRating", 
    label: "평점", 
    options: ["2점 대", "3점 대", "4점 대"],
    valueMap: {
      "2점 대": "2",
      "3점 대": "3",
      "4점 대": "4"
    }
  },
];

export const simplifyRegion = (region: string): string => {
  if (region.includes("서울")) return "서울";
  if (region.includes("경기")) return "경기";
  if (region.includes("부산")) return "부산";
  if (region.includes("대구")) return "대구";
  if (region.includes("인천")) return "인천";
  if (region.includes("대전")) return "대전";
  if (region.includes("광주")) return "광주";
  if (region.includes("울산")) return "울산";
  return "기타";
};
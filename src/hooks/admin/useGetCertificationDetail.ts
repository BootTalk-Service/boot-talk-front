import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";

const fetchCertificationDetail = async (certificationId: number) => {
  const res = await fetch(`${END_POINT.ADMIN_CERTIFICATION}/${certificationId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("수료증 상세 정보를 불러오는 데 실패했습니다.");
  }

  return res.json();
};

export const useGetCertificationDetail = (certificationId: number) => {
  return useQuery({
    queryKey: ["certificationDetail", certificationId],
    queryFn: () => fetchCertificationDetail(certificationId),
    enabled: !!certificationId,
  });
};

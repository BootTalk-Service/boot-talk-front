"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useGetBootcamps } from "@/hooks/main-page/useGetBootcamps";
import BootcampCard from "./BootcampCard";
import { Bootcamp } from "@/types/Bootcamp";

const BootcampList = () => {
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const { bootcamps, fetchNextPage, hasNextPage, isLoading, isError } = useGetBootcamps(filters);
  
  // Observer 참조 생성
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 현재 로드된 항목 수 로깅
    console.log(`현재 로드된 부트캠프 수: ${bootcamps.length}`);
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("다음 페이지 로드 시작");
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" } // rootMargin 추가로 미리 로드 시작
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
      console.log("Observer 설정 완료");
    }

    return () => {
      observer.disconnect();
      console.log("Observer 해제");
    };
  }, [fetchNextPage, hasNextPage, bootcamps.length]); // bootcamps.length 의존성 추가

  if (isLoading && bootcamps.length === 0) return <div className="text-center py-8">로딩 중...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  if (!bootcamps || bootcamps.length === 0) return <div className="text-center py-8">검색 결과가 없습니다.</div>;

  return (
    <section className="px-28 py-6">
      <div className="grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-sm text-gray-600 border-b border-t border-slate-300 bg-slate-50">
        <span>교육과정명</span>
        <span>학습기간</span>
        <span className="flex justify-start pl-10">프로그램 과정</span>
        <span className="flex justify-start pl-14">지역</span>
        <span className="flex justify-start pl-14">정원</span>
        <span>평점 및 리뷰</span>
      </div>
      <ul>
      {bootcamps.map((bootcamp: Bootcamp, index) => (
              <BootcampCard 
                key={`${bootcamp.bootcampId}-${index}`} 
                {...bootcamp} 
              />
        ))}
      </ul>

       {/* 무한 스크롤 감지 요소 */}
      <div 
        ref={observerRef}
        className="py-4 text-center"
      >
        {hasNextPage && (
          <div className="w-8 h-8 mx-auto border-t-2 border-b-2 border-amber-950 rounded-full animate-spin"></div>
        )}
      </div>
    </section>
  );
};


export default BootcampList;

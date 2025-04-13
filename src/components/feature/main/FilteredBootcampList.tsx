import BootcampCard from "@/components/feature/main/BootcampCard";
import { simplifyRegion } from "@/components/feature/main/utils/region";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bootcamps: any[];
  filters: { [key: string]: string };
}

const FilteredBootcampList = ({ bootcamps, filters }: Props) => {
  const filtered = bootcamps?.filter((camp) => {
    if (filters["지역"] && simplifyRegion(camp.bootcamp_region) !== filters["지역"]) {return false;}
    if (filters["직무"] && !camp.bootcamp_category.includes(filters["직무"])) {return false;}
    if (filters["기간"]) {
      const start = new Date(camp.bootcamp_start_date);
      const end = new Date(camp.bootcamp_end_date);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const diffWeeks = diffDays / 7;

      if (filters["기간"] === "4주 미만" && diffWeeks >= 4) return false;
      if (filters["기간"] === "4~12주" && (diffWeeks < 4 || diffWeeks > 12)) return false;
      if (filters["기간"] === "12주 이상" && diffWeeks <= 12) return false;
    }

    if (filters["평점"]) {
      const minRating = parseFloat(filters["평점"].split(" ")[0]);
      if (camp.bootcamp_rating < minRating) {return false;}
    }

    return true;
  });

  return (
    <>
      {filtered?.length > 0 ? (
        filtered.map((camp) => <BootcampCard key={camp.bootcamp_id} {...camp} />)
      ) : (
        <p className="text-center py-4">조건에 맞는 부트캠프가 없습니다.</p>
      )}
    </>
  );
};

export default FilteredBootcampList;
"use client";

import { useState } from "react";
import SearchSection from "@/components/common/SearchSection";
import FilterButtons from "@/components/feature/main/FilterButtons";
import BootcampList from "@/components/feature/main/BootcampList";
import { useGetBootcampCategories } from "@/hooks/main-page/useGetBootcampCategories";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const { data: categories = [] } = useGetBootcampCategories();

  return (
    <main>
      <SearchSection />
      <FilterButtons
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        categoryOptions={categories}
      />
      <BootcampList filters={selectedFilters} />
    </main>
  );
}

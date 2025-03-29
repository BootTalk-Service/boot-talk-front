"use client"

import { useState } from "react"
import SearchSection from "@/components/common/SerchSectioin"
import FilterButtons from "@/components/feature/main/FilterButtons"
import BootcampList from "@/components/feature/main/BootcampList";


export default function Home() {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  return (
    <main>
      <SearchSection />
      <FilterButtons onFilterChange={setFilters}/>
      <BootcampList filters={filters}/>
    </main>
  );
}

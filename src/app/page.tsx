"use client";

import { useState, useEffect } from "react";
import SearchSection from "@/components/common/SearchSection";
import FilterButtons from "@/components/feature/main/FilterButtons";
import BootcampList from "@/components/feature/main/BootcampList";
import { useGetBootcampCategories } from "@/hooks/main-page/useGetBootcampCategories";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const { data: categories = [] } = useGetBootcampCategories();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    if (token) {
      localStorage.setItem("access_token", token);
    }
    if (userId) {
      localStorage.setItem("user_id", userId);
    }
  }, []);

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

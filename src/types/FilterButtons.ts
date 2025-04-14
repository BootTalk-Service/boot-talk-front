export interface FilterButtonsProps {
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  categoryOptions: string[];
}
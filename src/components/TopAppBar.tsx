import { SearchBar } from "./SearchBar";
import { Tabs } from "./Tabs";
import { SortModal } from "./SortModal";
import { Header, SearchContainer } from "../styles/HomePage.styles";

interface TopAppBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isModalOpen: boolean;
  onFilterClick: () => void;
  onSort: (field: "firstName" | "birthday", direction: "asc" | "desc") => void;
}

export const TopAppBar = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  isModalOpen,
  onFilterClick,
  onSort,
}: TopAppBarProps) => {
  return (
    <>
      <Header>Поиск</Header>
      <SearchContainer>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onFilterClick={onFilterClick}
        />
        <Tabs activeTab={activeTab} onTabChange={onTabChange} />
      </SearchContainer>
      <SortModal
        isOpen={isModalOpen}
        onClose={() => onFilterClick()}
        onSort={onSort}
      />
    </>
  );
};

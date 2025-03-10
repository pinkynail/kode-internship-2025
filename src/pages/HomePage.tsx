import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import {
  $users,
  $usersCache,
  $isLoading,
  $error,
  fetchUsersFx,
  fetchUsersByDepartmentFx,
} from "../store/users";
import { SearchBar } from "../components/SearchBar";
import { Tabs } from "../components/Tabs";
import { EmployeeCard } from "../components/EmployeeCard";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { SortModal } from "../components/SortModal";
import {
  Header,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FilterIcon,
  Tabs as StyledTabs,
  Tab,
  EmployeeList,
} from "../styles/HomePage.styles";
import { User } from "../api/users";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { users, usersCache, isLoading, error } = useUnit({
    users: $users,
    usersCache: $usersCache,
    isLoading: $isLoading,
    error: $error,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!usersCache[activeTab]) {
      if (activeTab === "all") {
        fetchUsersFx();
      } else {
        fetchUsersByDepartmentFx(activeTab);
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "all") {
      setSortedUsers(usersCache["all"] || users || []);
    } else {
      const deptUsers =
        usersCache[activeTab] ||
        (users || []).filter((user) => user.department === activeTab);
      setSortedUsers(deptUsers);
    }
  }, [users, usersCache, activeTab, location]);

  useEffect(() => {
    const sourceUsers =
      activeTab === "all"
        ? usersCache["all"] || users || []
        : usersCache[activeTab] || [];
    const filtered = Array.isArray(sourceUsers)
      ? sourceUsers.filter((user) =>
          `${user.firstName} ${user.lastName} ${user.userTag}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : [];
    setSortedUsers(filtered);
  }, [searchQuery, users, usersCache, activeTab]);

  const handleSort = (
    field: "firstName" | "birthday",
    direction: "asc" | "desc",
  ) => {
    const sorted = [...sortedUsers].sort((a, b) => {
      if (field === "firstName") {
        return direction === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName);
      } else {
        const today = new Date("2025-03-10");
        const getDaysToBirthday = (date: string) => {
          const bday = new Date(date);
          bday.setFullYear(today.getFullYear());
          if (bday < today) bday.setFullYear(today.getFullYear() + 1);
          return (bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        };
        return direction === "asc"
          ? getDaysToBirthday(a.birthday) - getDaysToBirthday(b.birthday)
          : getDaysToBirthday(b.birthday) - getDaysToBirthday(a.birthday);
      }
    });
    setSortedUsers(sorted);
  };

  if (isLoading) {
    return (
      <div>
        <Header>Поиск</Header>
        <SearchContainer>
          <SearchIcon>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SearchIcon>
          <SearchInput
            placeholder="Введи имя, тэг, почту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled
          />
          <FilterIcon>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 21V14"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 10V3"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21V12"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V3"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 21V16"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 12V3"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 14H7"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H15"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 16H23"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </FilterIcon>
        </SearchContainer>
        <StyledTabs>
          <Tab $active={true}>Все</Tab>
          <Tab $active={false}>Дизайн</Tab>
          <Tab $active={false}>Аналитика</Tab>
          <Tab $active={false}>Менеджмент</Tab>
          <Tab $active={false}>iOS</Tab>
          <Tab $active={false}>Android</Tab>
        </StyledTabs>
        <EmployeeList>
          <SkeletonLoader count={12} />
        </EmployeeList>
      </div>
    );
  }
  if (error) return <div>Произошла ошибка при загрузке данных.</div>;

  return (
    <div>
      <Header>Поиск</Header>
      <SearchContainer>
        <SearchIcon>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SearchIcon>
        <SearchInput
          placeholder="Введи имя, тэг, почту..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterIcon onClick={() => setIsModalOpen(true)}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 21V14"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 10V3"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 21V12"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V3"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 21V16"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 12V3"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 14H7"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H15"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 16H23"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </FilterIcon>
      </SearchContainer>
      <StyledTabs>
        <Tab $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          Все
        </Tab>
        <Tab
          $active={activeTab === "design"}
          onClick={() => setActiveTab("design")}
        >
          Дизайн
        </Tab>
        <Tab
          $active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        >
          Аналитика
        </Tab>
        <Tab
          $active={activeTab === "management"}
          onClick={() => setActiveTab("management")}
        >
          Менеджмент
        </Tab>
        <Tab $active={activeTab === "ios"} onClick={() => setActiveTab("ios")}>
          iOS
        </Tab>
        <Tab
          $active={activeTab === "android"}
          onClick={() => setActiveTab("android")}
        >
          Android
        </Tab>
      </StyledTabs>
      <EmployeeList>
        {sortedUsers.length === 0 ? (
          <p>{searchQuery ? "Ничего не найдено" : "Нет пользователей"}</p>
        ) : (
          sortedUsers.map((user) => <EmployeeCard key={user.id} user={user} />)
        )}
      </EmployeeList>
      <SortModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSort={handleSort}
      />
    </div>
  );
};

export default HomePage;

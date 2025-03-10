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
import styled from "styled-components";
import { User } from "../api/users";
import { useLocation } from "react-router-dom";

const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding-bottom: 20px;
`;

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
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onFilterClick={() => setIsModalOpen(true)}
        />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <EmployeeList>
          <SkeletonLoader count={12} />
        </EmployeeList>
      </div>
    );
  }
  if (error) return <div>Произошла ошибка при загрузке данных.</div>;

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onFilterClick={() => setIsModalOpen(true)}
      />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
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

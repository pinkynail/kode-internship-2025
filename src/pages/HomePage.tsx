import { useEffect, useState, useRef } from "react";
import { useUnit } from "effector-react";
import {
  $users,
  $usersCache,
  $isLoading,
  $error,
  fetchUsersFx,
  fetchUsersByDepartmentFx,
} from "../store/users";
import { TopAppBar } from "../components/TopAppBar";
import { EmployeeCard } from "../components/EmployeeCard";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { EmployeeList } from "../styles/HomePage.styles";
import { User } from "../api/users";
import { SortModal } from "../components/SortModal";

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
  const [sortConfig, setSortConfig] = useState<{
    field: "alphabet" | "birthday";
    direction: "asc" | "desc";
  }>({
    field: "alphabet",
    direction: "asc",
  });
  const requestedTabsRef = useRef<string[]>([]); // Используем useRef вместо состояния

  useEffect(() => {
    console.log("useEffect сработал для activeTab:", activeTab);
    if (
      !usersCache[activeTab] &&
      !isLoading &&
      !requestedTabsRef.current.includes(activeTab)
    ) {
      console.log("Отправляем запрос для вкладки:", activeTab);
      requestedTabsRef.current = [...requestedTabsRef.current, activeTab]; // Синхронное обновление
      if (activeTab === "all") {
        fetchUsersFx();
      } else {
        fetchUsersByDepartmentFx(activeTab);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
    const sorted = [...filtered].sort((a, b) => {
      const { field, direction } = sortConfig;
      let comparison = 0;
      if (field === "alphabet") {
        comparison = a.firstName.localeCompare(b.firstName);
      } else if (field === "birthday") {
        const today = new Date("2025-03-10");
        const getDaysToBirthday = (date: string) => {
          const bday = new Date(date);
          bday.setFullYear(today.getFullYear());
          if (bday < today) bday.setFullYear(today.getFullYear() + 1);
          return (bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        };
        comparison =
          getDaysToBirthday(a.birthday) - getDaysToBirthday(b.birthday);
      }
      return direction === "asc" ? comparison : -comparison;
    });
    setSortedUsers(sorted);
  }, [searchQuery, users, usersCache, activeTab, sortConfig]);

  const handleSort = (field: "alphabet" | "birthday") => {
    setSortConfig((prev) => ({
      field,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <TopAppBar
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isModalOpen={isModalOpen}
          onFilterClick={() => setIsModalOpen(true)}
          onSort={handleSort}
        />
        <EmployeeList>
          <SkeletonLoader count={12} />
        </EmployeeList>
      </div>
    );
  }
  if (error) return <div>Произошла ошибка при загрузке данных.</div>;

  return (
    <div>
      <TopAppBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isModalOpen={isModalOpen}
        onFilterClick={() => setIsModalOpen(true)}
        onSort={handleSort}
      />
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
        currentSort={sortConfig.field}
      />
    </div>
  );
};

export default HomePage;

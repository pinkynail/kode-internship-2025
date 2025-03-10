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
import { TopAppBar } from "../components/TopAppBar";
import { EmployeeCard } from "../components/EmployeeCard";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { EmployeeList } from "../styles/HomePage.styles";
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
  }, [activeTab, usersCache]);

  useEffect(() => {
    if (activeTab === "all") {
      setSortedUsers(
        (usersCache["all"] || users || []).filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.id === user.id),
        ),
      );
    } else {
      const deptUsers = (
        usersCache[activeTab] ||
        (users || []).filter(
          (user) => user.department.toLowerCase() === activeTab.toLowerCase(),
        )
      ).filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.id === user.id),
      );
      setSortedUsers(deptUsers);
    }
  }, [users, usersCache, activeTab, location]);

  useEffect(() => {
    const sourceUsers =
      activeTab === "all"
        ? usersCache["all"] || users || []
        : usersCache[activeTab] || [];
    const filtered = Array.isArray(sourceUsers)
      ? sourceUsers
          .filter((user) =>
            `${user.firstName} ${user.lastName} ${user.userTag}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          )
          .filter(
            (user, index, self) =>
              index === self.findIndex((u) => u.id === user.id),
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
    setIsModalOpen(false); // Закрываем модальное окно после сортировки
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
    </div>
  );
};

export default HomePage;

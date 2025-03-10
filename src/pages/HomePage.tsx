import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import {
  $users,
  $isLoading,
  $error,
  fetchUsersFx,
  fetchUsersByDepartmentFx,
} from "../store/users";
import { SortModal } from "../components/SortModal";
import styled from "styled-components";
import { User } from "../api/users";
import { Link } from "react-router-dom";

// Стили из предоставленного кода
const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px;
  border-radius: 12px;
  border: none;
  background-color: #f6f6f6;
  font-size: 16px;
  color: #888;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const FilterIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 10px 15px;
  cursor: pointer;
  color: #888;
  font-size: 15px;
  position: relative;
  ${(props) =>
    props.active &&
    `
    color: #5460E8;
    font-weight: 500;
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #5460E8;
      border-radius: 2px;
    }
  `}
`;

const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EmployeeCard = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
`;

const EmployeeAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  object-fit: cover;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.div`
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const EmployeeUsername = styled.span`
  color: #888;
  font-size: 14px;
  margin-left: 5px;
  font-weight: normal;
`;

const EmployeeTitle = styled.div`
  color: #555;
  font-size: 14px;
`;

export const HomePage = () => {
  const { users, isLoading, error } = useUnit({
    users: $users,
    isLoading: $isLoading,
    error: $error,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeTab === "all") {
      fetchUsersFx();
    } else {
      fetchUsersByDepartmentFx(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.userTag}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
    setSortedUsers(filtered);
  }, [users, searchQuery]);

  const handleSort = (
    field: "firstName" | "birthday",
    direction: "asc" | "desc",
  ) => {
    const sorted = [...users].sort((a, b) => {
      if (field === "firstName") {
        return direction === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName);
      } else {
        return direction === "asc"
          ? new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
          : new Date(b.birthday).getTime() - new Date(a.birthday).getTime();
      }
    });
    setSortedUsers(sorted);
  };

  if (isLoading) return <div>Загрузка...</div>;
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
      <Tabs>
        <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          Все
        </Tab>
        <Tab
          active={activeTab === "design"}
          onClick={() => setActiveTab("design")}
        >
          Designers
        </Tab>
        <Tab
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        >
          Analysts
        </Tab>
        <Tab
          active={activeTab === "management"}
          onClick={() => setActiveTab("management")}
        >
          Managers
        </Tab>
        <Tab active={activeTab === "ios"} onClick={() => setActiveTab("ios")}>
          iOS
        </Tab>
        <Tab
          active={activeTab === "android"}
          onClick={() => setActiveTab("android")}
        >
          Android
        </Tab>
      </Tabs>
      <EmployeeList>
        {sortedUsers.length === 0 ? (
          <p>{searchQuery ? "Ничего не найдено" : "Нет пользователей"}</p>
        ) : (
          sortedUsers.map((user) => (
            <EmployeeCard key={user.id}>
              <EmployeeAvatar
                src="/api/placeholder/60/60" // Замени на динамический URL, если есть
                alt={`${user.firstName} ${user.lastName}`}
              />
              <EmployeeInfo>
                <EmployeeName>
                  {user.firstName} {user.lastName}
                  <EmployeeUsername>{user.userTag}</EmployeeUsername>
                </EmployeeName>
                <EmployeeTitle>{user.position}</EmployeeTitle>
              </EmployeeInfo>
            </EmployeeCard>
          ))
        )}
      </EmployeeList>
      <button onClick={() => setIsModalOpen(true)}>Сортировать</button>
      <SortModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSort={handleSort}
      />
    </div>
  );
};

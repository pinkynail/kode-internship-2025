// src/pages/DetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { $users } from "../store/users";
import styled from "styled-components";
import { User } from "../api/users"; // Импорт используется для типизации

const Container = styled.div`
  padding: 20px;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const users = useUnit($users);
  const navigate = useNavigate();

  const user: User | undefined = users.find((u) => u.id === id); // Явно указываем тип User

  if (!user) return <div>Пользователь не найден</div>;

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>Назад</BackButton>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>Тег: {user.userTag}</p>
      <p>Департамент: {user.department}</p>
      <p>Дата рождения: {new Date(user.birthday).toLocaleDateString()}</p>
      <p>
        Телефон: <a href={`tel:${user.phone}`}>{user.phone}</a>
      </p>
    </Container>
  );
};

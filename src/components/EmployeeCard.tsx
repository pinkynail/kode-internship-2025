import styled from "styled-components";
import { Link } from "react-router-dom";
import { User } from "../types/user";

export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 6px 0;
  }
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Username = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #888888;
  margin-left: 5px;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Title = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #555555;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

interface EmployeeCardProps {
  user: User;
}

export const EmployeeCard = ({ user }: EmployeeCardProps) => {
  // Генерируем уникальный URL placeholder на основе id
  const placeholderUrl = `https://placehold.co/${user.id.slice(-6)}x${user.id.slice(-6)}/E0E0E0/FFFFFF?text=${user.userTag}`;

  return (
    <Card as={Link} to={`/user/${user.id}`}>
      <Avatar
        src={user.avatarUrl || placeholderUrl}
        alt={`${user.firstName} ${user.lastName}`}
        onError={(e) => {
          e.currentTarget.src = placeholderUrl; // Используем уникальный placeholder при ошибке
        }}
      />
      <Info>
        <Name>
          {user.firstName} {user.lastName}
          <Username>{user.userTag}</Username>
        </Name>
        <Title>{user.position}</Title>
      </Info>
    </Card>
  );
};

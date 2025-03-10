import styled from "styled-components";
import { Link } from "react-router-dom";
import { User } from "../types/user";
import goosePlaceholder from "../../assets/goose-placeholder.png";
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
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
  background-color: #f0f0f0;
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
`;

export const Username = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #888888;
  margin-left: 5px;
  font-weight: 400;
`;

export const Title = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #555555;
  font-weight: 400;
`;

interface EmployeeCardProps {
  user: User;
}

export const EmployeeCard = ({ user }: EmployeeCardProps) => {
  return (
    <Card as={Link} to={`/user/${user.id}`}>
      <Avatar
        src={user.avatarUrl || goosePlaceholder} // Сначала user.avatarUrl, если пусто — гусь
        alt={`${user.firstName} ${user.lastName}`}
        onError={(e) => {
          e.currentTarget.src = goosePlaceholder; // При ошибке загрузки — гусь
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

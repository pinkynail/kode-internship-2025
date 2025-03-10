import styled from "styled-components";
import { Link } from "react-router-dom";
import { User } from "../types/user"; // Добавляем импорт типа User

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  text-decoration: none;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    .employee-avatar {
      margin-bottom: 10px;
    }
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const Username = styled.span`
  color: #888;
  font-size: 14px;
  margin-left: 5px;
  font-weight: normal;
`;

const Title = styled.div`
  color: #555;
  font-size: 14px;
`;

interface EmployeeCardProps {
  user: User;
}

export const EmployeeCard = ({ user }: EmployeeCardProps) => (
  <Card as={Link} to={`/user/${user.id}`}>
    <Avatar
      src="https://placehold.co/60x60"
      alt={`${user.firstName} ${user.lastName}`}
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

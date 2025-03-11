import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUnit } from "effector-react";
import { $users, $usersCache, fetchUsersFx } from "../store/users";
import { User } from "../api/users";

import ArrowIcon from "../../assets/Right.svg?react";
import FavoriteIcon from "../../assets/icon-favorite-1.svg?react";
import PhoneIcon from "../../assets/icon-phone-alt-1.svg?react";

// Основной контейнер
const DetailContainer = styled.div`
  background: var(--light-bg-secondary, #f7f7f8);
  min-height: 100vh;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: var(--font-family-inter, "Inter", sans-serif);
  color: var(--light-text-primary, #050510);
`;

// Навигационная панель
const NavigationBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 24px;
  background-color: #ffffff;
  z-index: 1000;
`;

// Кнопка "Назад"
const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

// Иконка стрелки
const NavArrow = styled(ArrowIcon)`
  width: 24px;
  height: 24px;
  transform: rotate(180deg); /* Повернуть стрелку влево */
`;

// Контейнер для контента
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

// Шапка профиля
const ProfileHeader = styled.div`
  background-color: var(--light-bg-secondary, #f7f7f8);
  padding: 72px 0 24px;
  text-align: center;
`;

// Аватарка
const ProfileAvatar = styled.img`
  width: 128px;
  height: 128px;
  margin: 0 auto 24px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 96px;
    height: 96px;
  }
`;

// Информация о пользователе
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Контейнер для имени и никнейма
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

// Имя
const Name = styled.h1`
  color: var(--light-text-primary, #050510);
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Никнейм
const Username = styled.span`
  color: var(--light-text-tetriary, #96969b);
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
`;

// Должность
const Occupation = styled.div`
  color: var(--light-text-secondary, #55555c);
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;

// Разделители
const SpacingDivider8 = styled.div`
  height: 8px;
  background-color: var(--light-bg-secondary, #f7f7f8);
`;

const SpacingDivider16 = styled.div`
  height: 16px;
  background-color: var(--light-bg-secondary, #f7f7f8);
`;

// Контактные данные
const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// Элемент контакта
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  min-height: 60px;
`;

// Левая часть контакта (иконка + текст)
const ContactLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Иконка контакта
const ContactIcon = styled.div`
  width: 24px;
  height: 24px;
`;

// Текст контакта
const ContactTitle = styled.div`
  font-size: var(--font-size-m, 16px);
  font-weight: 500;
  color: var(--light-text-primary, #050510);
  line-height: 20px;
`;

// Деталь контакта (например, возраст)
const ContactDetail = styled.div`
  font-size: var(--font-size-m, 16px);
  font-weight: 500;
  color: var(--light-text-tetriary, #96969b);
  line-height: 20px;
`;

// Разделитель
const Separator = styled.div`
  height: 1px;
  background-color: var(--light-bg-secondary, #f7f7f8);
  width: 100%;
`;

// Ссылка на телефон
const PhoneLink = styled.a`
  color: var(--light-text-primary, #050510);
  text-decoration: none;
  &:hover {
    color: #6534ff;
  }
`;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, usersCache } = useUnit({
    users: $users,
    usersCache: $usersCache,
  });
  const triggerFetch = useUnit(fetchUsersFx);

  useEffect(() => {
    if (users.length === 0 && !usersCache["all"]) {
      triggerFetch();
    }
  }, [users.length, usersCache, triggerFetch]);

  const user: User | undefined = [...(usersCache["all"] || []), ...users].find(
    (u) => u.id === id,
  );

  if (!user) {
    return <DetailContainer>Пользователь не найден</DetailContainer>;
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${user.phone}`;
  };

  // Рассчитываем возраст
  const birthDate = new Date(user.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return (
    <DetailContainer>
      <NavigationBar>
        <BackButton onClick={() => navigate(-1)}>
          <NavArrow />
        </BackButton>
      </NavigationBar>
      <Container>
        <ProfileHeader>
          <ProfileAvatar
            src={user.avatarUrl || "https://via.placeholder.com/128"}
            alt={user.firstName}
          />
          <ProfileInfo>
            <NameContainer>
              <Name>
                {user.firstName} {user.lastName}
              </Name>
              <Username>{user.userTag.toLowerCase()}</Username>
            </NameContainer>
            <Occupation>{user.department}</Occupation>
          </ProfileInfo>
        </ProfileHeader>
        <SpacingDivider8 />
        <SpacingDivider16 />
        <ContactDetails>
          <ContactItem>
            <ContactLeft>
              <ContactIcon>
                <FavoriteIcon />
              </ContactIcon>
              <ContactTitle>
                {new Date(user.birthday).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </ContactTitle>
            </ContactLeft>
            <ContactDetail>{age} года</ContactDetail>
          </ContactItem>
          <Separator />
          <ContactItem>
            <ContactLeft>
              <ContactIcon>
                <PhoneIcon />
              </ContactIcon>
              <ContactTitle>
                <PhoneLink
                  href={`tel:${user.phone}`}
                  onClick={handlePhoneClick}
                >
                  {user.phone}
                </PhoneLink>
              </ContactTitle>
            </ContactLeft>
          </ContactItem>
        </ContactDetails>
      </Container>
    </DetailContainer>
  );
};

export default DetailPage;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUnit } from "effector-react";
import { $users, $usersCache, fetchUsersFx } from "../store/users";
import { User } from "../api/users";

import RawNavArrow from "../../assets/Right.svg?react";
import FavoriteIcon from "../../assets/icon-favorite-1.svg?react";
import PhoneIcon from "../../assets/icon-phone-alt-1.svg?react";
import GoosePlaceholder from "../../assets/goose-placeholder.png";

// Маппинг департаментов
const departmentMap: { [key: string]: string } = {
  android: "Android",
  ios: "iOS",
  design: "Дизайн",
  management: "Менеджмент",
  qa: "QA",
  back_office: "Бэк-офис",
  frontend: "Frontend",
  hr: "HR",
  pr: "PR",
  backend: "Backend",
  support: "Техподдержка",
  analytics: "Аналитика",
};

// Стили
const DetailContainer = styled.div`
  grid-row-gap: 10px;
  background-color: #f7f7f8;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 720px;
  display: flex;
  overflow: hidden;
`;

const NavigationBar = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 40px;
  display: flex;
  overflow: hidden;
`;

const Frame3030 = styled.div`
  grid-column-gap: 16px;
  flex: 0 auto;
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
  display: flex;
  overflow: hidden;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const StyledNavArrow = styled(RawNavArrow)`
  object-fit: cover;
  width: 24px;
  height: 24px;
`;

const Frame3218 = styled.div`
  grid-row-gap: 28px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 30px 16px;
  display: flex;
`;

const ProfileAvatar = styled.img`
  object-fit: cover;
  border-radius: 64px;
  width: 104px;
  height: 104px;
`;

const Frame3219 = styled.div`
  grid-row-gap: 12px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const Frame3220 = styled.div`
  grid-column-gap: 4px;
  flex: 0 auto;
  justify-content: flex-start;
  align-items: flex-end;
  display: flex;
  overflow: hidden;
`;

const Name = styled.div`
  color: #050510;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
`;

const Username = styled.div`
  color: #97979b;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Inter, sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
`;

const Occupation = styled.div`
  color: #55555c;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
`;

const Frame3221 = styled.div`
  grid-row-gap: 13px;
  background-color: #fff;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 456px;
  padding: 17px 16px;
  display: flex;
  overflow: hidden;
`;

const Frame3222 = styled.div`
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-top: 9px;
  padding-bottom: 9px;
  display: flex;
`;

const Frame3223 = styled.div`
  grid-column-gap: 14px;
  flex: 0 auto;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

const ContactIcon = styled.div`
  object-fit: cover;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactTitle = styled.div`
  color: #050510;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  font-family: Inter, sans-serif;
`;

const ContactDetail = styled.div`
  color: #97979b;
  text-align: right;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  font-family: Inter, sans-serif;
`;

const Frame3224 = styled.div`
  grid-column-gap: 14px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 9px;
  padding-bottom: 9px;
  display: flex;
`;

const PhoneLink = styled.a`
  color: #050510;
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

  const formattedBirthDate = birthDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePhoneClick = () => {
    window.location.href = `tel:${user.phone}`;
  };

  return (
    <DetailContainer className="_205">
      <NavigationBar className="navigation-barx-3">
        <Frame3030 className="frame-3030">
          <BackButton onClick={() => navigate(-1)}>
            <StyledNavArrow className="iconarrowchevronmediumsoloright" />
          </BackButton>
        </Frame3030>
      </NavigationBar>
      <Frame3218 className="frame-3218">
        <ProfileAvatar
          src={user.avatarUrl || GoosePlaceholder}
          alt={`${user.firstName} ${user.lastName}`}
          className="iconsvg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = GoosePlaceholder;
          }}
        />
        <Frame3219 className="frame-3219">
          <Frame3220 className="frame-3220">
            <Name className="text">
              {user.firstName} {user.lastName}
            </Name>
            <Username className="text-6">{user.userTag.toLowerCase()}</Username>
          </Frame3220>
          <Occupation className="text-7">
            {departmentMap[user.department] || user.department}
          </Occupation>
        </Frame3219>
      </Frame3218>
      <Frame3221 className="frame-3221">
        <Frame3222 className="frame-3222">
          <Frame3223 className="frame-3223">
            <ContactIcon className="iconarrowchevronmediumsoloright">
              <FavoriteIcon />
            </ContactIcon>
            <ContactTitle className="title-style-4">
              {formattedBirthDate}
            </ContactTitle>
          </Frame3223>
          <ContactDetail className="detail">{age} года</ContactDetail>
        </Frame3222>
        <Frame3224 className="frame-3224">
          <ContactIcon className="iconarrowchevronmediumsoloright">
            <PhoneIcon />
          </ContactIcon>
          <PhoneLink href={`tel:${user.phone}`} onClick={handlePhoneClick}>
            <ContactTitle className="title-style-4">{user.phone}</ContactTitle>
          </PhoneLink>
        </Frame3224>
      </Frame3221>
    </DetailContainer>
  );
};

export default DetailPage;

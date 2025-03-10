import styled from "styled-components";

export const Header = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #000000;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px 40px;
  border-radius: 12px;
  border: none;
  background-color: #f6f6f6;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  outline: none;
  transition: background-color 0.3s;

  &::placeholder {
    color: #888888;
  }

  &:focus {
    background-color: #e8e8e8;
  }

  @media (max-width: 480px) {
    height: 40px;
    font-size: 14px;
    padding: 10px 35px;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const FilterIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: #5460e8;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

export const Tab = styled.div<{ $active: boolean }>`
  font-family: "Inter", sans-serif;
  padding: 10px 0;
  cursor: pointer;
  color: #888888;
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? 600 : 500)};
  position: relative;
  transition: color 0.3s;

  ${(props) =>
    props.$active &&
    `
    color: #5460e8;
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #5460e8;
      border-radius: 2px;
    }
  `}

  &:hover {
    color: #5460e8;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 0;
  }
`;

export const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding-bottom: 20px;

  @media (max-width: 480px) {
    max-height: calc(100vh - 160px);
    gap: 12px;
  }
`;

export const EmployeeCard = styled.div`
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

export const EmployeeAvatar = styled.img`
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

export const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmployeeName = styled.div`
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

export const EmployeeUsername = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #888888;
  margin-left: 5px;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const EmployeeTitle = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: #555555;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 10px 15px;
  cursor: pointer;
  color: #888;
  font-size: 15px;
  position: relative;
  ${(props) =>
    props.$active &&
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

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => (
  <TabsContainer>
    <Tab $active={activeTab === "all"} onClick={() => onTabChange("all")}>
      Все
    </Tab>
    <Tab $active={activeTab === "design"} onClick={() => onTabChange("design")}>
      Дизайн
    </Tab>
    <Tab
      $active={activeTab === "analytics"}
      onClick={() => onTabChange("analytics")}
    >
      Аналитика
    </Tab>
    <Tab
      $active={activeTab === "management"}
      onClick={() => onTabChange("management")}
    >
      Менеджмент
    </Tab>
    <Tab $active={activeTab === "ios"} onClick={() => onTabChange("ios")}>
      iOS
    </Tab>
    <Tab
      $active={activeTab === "android"}
      onClick={() => onTabChange("android")}
    >
      Android
    </Tab>
  </TabsContainer>
);

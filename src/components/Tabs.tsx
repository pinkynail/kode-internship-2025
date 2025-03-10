import { Tabs as TabsContainer, Tab } from "../styles/HomePage.styles";

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

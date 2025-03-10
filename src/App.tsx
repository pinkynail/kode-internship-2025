import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { HomePage } from "./pages/HomePage";
import { UserDetailsPage } from "./pages/UserDetailsPage";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  console.log("App is rendering"); // Добавляем лог
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetailsPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;

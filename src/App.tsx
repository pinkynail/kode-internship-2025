import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Импорт по умолчанию
import DetailPage from "./pages/DetailPage"; // Импорт по умолчанию

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;

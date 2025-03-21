import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Импорт по умолчанию
import DetailPage from "./pages/DetailPage"; // Импорт по умолчанию

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

import { Routes, Route, Navigate } from "react-router-dom"

import HomePage from "./pages/HomePage"
import TodoPage from "./pages/TodoPage"
import NotFoundPage from "./pages/NotFoundPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id" element={<TodoPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

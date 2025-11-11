import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage, TodoPage, NotFoundPage } from "./pages"

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

import { useState } from "react"

// import {
//   todoText,
//   setTodoText,
//   refresh,
//   refreshTodos,
//   editingId,
//   setEditingId,
//   editingText,
//   setEditingText,
//   searchQuery,
//   setSearchQuery,
//   isSorting,
//   setIsSorting,
//   validateText,
//   setValidateText,
//   isDisabledSubmit,
//   setIsDisabledSubmit,
// } from "./useTodoState"

export function useTodoState() {
  const [todoText, setTodoText] = useState("")
  const [refresh, setRefresh] = useState(false) // флаг для отслеживания изменений в списке
  const [editingId, setEditingId] = useState(null) // отслеживаем процесс редактирования

  const [editingText, setEditingText] = useState("") // обновленный текст дела
  const [searchQuery, setSearchQuery] = useState("") // поиск дела
  const [isSorting, setIsSorting] = useState(false) // флаг для сортировки

  const [validateText, setValidateText] = useState(null)
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false) // флаг для отключения кнопки отправки

  const refreshTodos = () => setRefresh(!refresh)

  return {
    todoText,
    setTodoText,
    refresh,
    refreshTodos,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    searchQuery,
    setSearchQuery,
    isSorting,
    setIsSorting,
    validateText,
    setValidateText,
    isDisabledSubmit,
    setIsDisabledSubmit,
  }
}

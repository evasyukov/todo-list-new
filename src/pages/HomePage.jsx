import { useState } from "react"

import {
  useRequestGetTodos,
  requestAddTodos,
  //   requestRemoveTodos,
  //   requestUpdateTodos,
} from "../api"

import AdditionForm from "../components/AdditionForm/AdditionForm"
import SortingTodoList from "../components/SortingTodoList/SortingTodoList"
import TodoList from "../components/TodoList/TodoList"

import "../App.css"

export default function HomePage() {
  const [todoText, setTodoText] = useState("")
  const [refresh, setRefresh] = useState(false) // флаг для отслеживания изменений в списке
  const [searchQuery, setSearchQuery] = useState("") // поиск дела
  const [isSorting, setIsSorting] = useState(false) // флаг для сортировки

  const [validateText, setValidateText] = useState(null)
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false) // флаг для отключения кнопки отправки

  const refreshTodos = () => setRefresh(!refresh)

  const { todos, isLoading, errorText } = useRequestGetTodos(refresh) // получаем список и состояние флага для отрисовки списка

  // получаем текст дела
  function handleChange(event) {
    setTodoText(event.target.value)

    // обнуляем флаги для валидации при вводе текста
    setValidateText(null)
    setIsDisabledSubmit(false)
  }

  // добавление дела
  function submitTodos(event) {
    event.preventDefault()

    if (todoText.trim().length < 1) {
      setValidateText("Текст дела не должен быть пустым")
      setIsDisabledSubmit(true)
    } else {
      requestAddTodos(todoText, refreshTodos)
      setTodoText("")
    }
  }

  // поиск дела по запросу и сортировка
  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (isSorting ? a.title.localeCompare(b.title) : 0))

  return (
    <>
      {/* форма добавления дела */}
      <AdditionForm
        todoText={todoText}
        handleChange={handleChange}
        submitTodos={submitTodos}
        validateText={validateText}
        isDisabledSubmit={isDisabledSubmit}
      />

      {/* поиск дела с сортировка */}
      <SortingTodoList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
      />

      {/* отрисовка списка дел */}
      <TodoList
        todos={filteredTodos}
        isLoading={isLoading}
        errorText={errorText}
      />
    </>
  )
}

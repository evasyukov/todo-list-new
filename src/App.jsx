import { useState } from "react"

import {
  useRequestGetTodos,
  requestAddTodos,
  requestRemoveTodos,
  requestUpdateTodos,
} from "./hooks"

import AdditionForm from "./components/AdditionForm"
import SortingTodoList from "./components/SortingTodoList"
import TodoList from "./components/TodoList"

import "./App.css"

export default function App() {
  const [todoText, setTodoText] = useState("")
  const [refresh, setRefresh] = useState(false) // флаг для отслеживания изменений в списке
  const [editingId, setEditingId] = useState(null) // отслеживаем процесс редактирования

  const [editingText, setEditingText] = useState("") // обновленный текст дела
  const [searchQuery, setSearchQuery] = useState("") // поиск дела
  const [isSorting, setIsSorting] = useState(false) // флаг для сортировки

  const [validateText, SetValidateText] = useState(null)
  const [isDisabledSubmit, SetIsDisabledSubmit] = useState(false) // флаг для отключения кнопки отправки

  const refreshTodos = () => setRefresh(!refresh)

  // хуки для взаимодействия со списком дел
  const { todos, isLoading, errorText } = useRequestGetTodos(refresh) // получаем список и состояние флага для отрисовки списка

  // получаем текст дела
  function handleChange(event) {
    setTodoText(event.target.value)

    // обнуляем флаги для валидации при вводе текста
    SetValidateText(null)
    SetIsDisabledSubmit(false)
  }

  // добавление дела
  function submitTodos(event) {
    event.preventDefault()

    if (todoText < 1) {
      SetValidateText("Текст дела не должен быть пустым")
      SetIsDisabledSubmit(true)
    } else {
      requestAddTodos(todoText, refreshTodos)
      setTodoText("")
    }
  }

  // удаляем дело из списка
  function deleteTodo(id) {
    requestRemoveTodos(id, refreshTodos)
  }

  // начало редактирования
  function startEditing(todo) {
    setEditingId(todo.id)
    setEditingText(todo.title)
  }

  // измеяем текст дела
  function handleTitleChange(event) {
    setEditingText(event.target.value)
  }

  // сохраняем изменения
  function saveTitle(todo) {
    requestUpdateTodos(todo.id, { title: editingText }, refreshTodos)
    setEditingId(null)
  }

  // изменение статуса дела
  function toggleCompleted(todo) {
    requestUpdateTodos(todo.id, { completed: !todo.completed }, refreshTodos)
  }

  // поиск дела по запросу и сортировка
  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      isSorting ? (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) : 0
    )

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
        editingId={editingId}
        editingText={editingText}
        handleTitleChange={handleTitleChange}
        saveTitle={saveTitle}
        startEditing={startEditing}
        deleteTodo={deleteTodo}
        toggleCompleted={toggleCompleted}
      />
    </>
  )
}

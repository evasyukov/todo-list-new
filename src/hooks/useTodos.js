import { useState, useEffect } from "react"

import { todosAPI } from "../api/api.todos"
import { useRequestGetTodos } from "../hooks"

export function useTodos() {
  const [todosLocal, setTodosLocal] = useState([])                           // список дел
  const [todoText, setTodoText] = useState("")                               // текст дела
  const [searchQuery, setSearchQuery] = useState("")                         // поиск дела
  const [isSorting, setIsSorting] = useState(false)                          // флаг для сортировки
  const [validateText, setValidateText] = useState(null)                     // валидация дела
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false)            // флаг для отключения кнопки отправки

  const { todos: initialTodos, isLoading, errorText } = useRequestGetTodos() // получаем начальный список дел

  // сохраняем начальные данные в локальное состояние
  useEffect(() => {
    if (initialTodos.length > 0) {
      setTodosLocal(initialTodos)
    }
  }, [initialTodos])

  // получаем текст дела
  function handleChange(event) {
    setTodoText(event.target.value)

    // обнуляем флаги для валидации при вводе текста
    setValidateText(null)
    setIsDisabledSubmit(false)
  }

  // добавление дела
  async function submitTodos(event) {
    event.preventDefault()

    if (todoText.trim().length < 1) {
      setValidateText("Текст дела не должен быть пустым")
      setIsDisabledSubmit(true)
      return
    }

    try {
      const newTodo = await todosAPI.addTodo(todoText)
      setTodosLocal((prevTodos) => [...prevTodos, newTodo])
      setTodoText("")
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error)
    }
  }

  // удаляем дело из списка
  async function deleteTodo(todo, navigate) {
    try {
      await todosAPI.removeTodo(todo.id)
      navigate("/")
    } catch (error) {
      console.error("Ошибка при удалении:", error)
    }
  }

  // сохраняем изменения
  async function saveTitle(todo, editingText, setTodo, setEditing) {
    try {
      await todosAPI.updateTodo(todo.id, { title: editingText })
      setTodo((prev) => ({ ...prev, title: editingText }))
      setEditing(false)
    } catch (error) {
      console.error("Ошибка при сохранении:", error)
    }
  }

  // изменение статуса дела
  async function toggleCompleted(todo, setTodo) {
    try {
      const updated = !todo.completed
      await todosAPI.updateTodo(todo.id, { completed: updated })
      setTodo((prev) => ({ ...prev, completed: updated }))
    } catch (error) {
      console.error("Ошибка при изменении статуса:", error)
    }
  }

  // поиск дела по запросу и сортировка
  const filteredTodos = todosLocal
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      isSorting ? (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) : 0
    )

  return {
    // получение дела
    todos: filteredTodos,
    isLoading,
    errorText,

    // добавление дела
    todoText,
    handleChange,
    submitTodos,
    validateText,
    isDisabledSubmit,

    // поиск и сортировка
    searchQuery,
    setSearchQuery,
    isSorting,
    setIsSorting,

    // редактирование и удаление
    saveTitle,
    deleteTodo,
    toggleCompleted,
  }
}

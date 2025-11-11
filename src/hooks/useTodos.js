import { useState, useEffect } from "react"

import { todosAPI } from "../api/api.todos"
import { useRequestGetTodos } from "../hooks"

export function useTodos() {
  const [todos, setTodos] = useState([])                                     // список дел
  const [todoText, setTodoText] = useState("")                               // текст дела
  const [searchQuery, setSearchQuery] = useState("")                         // поиск дела
  const [isSorting, setIsSorting] = useState(false)                          // флаг для сортировки
  const [validateText, setValidateText] = useState(null)                     // валидация дела
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false)            // флаг для отключения кнопки отправки

  const { todos: initialTodos, isLoading, errorText } = useRequestGetTodos() // получаем начальный список дел

  // сохраняем начальные данные в локальное состояние
  useEffect(() => {
    if (initialTodos.length > 0) {
      setTodos(initialTodos)
    }
  }, [initialTodos])

  // получаем текст дела
  const handleChange = (event) => {
    setTodoText(event.target.value)

    // обнуляем флаги для валидации при вводе текста
    setValidateText(null)
    setIsDisabledSubmit(false)
  }

  // добавление дела
  const submitTodos = async (event) => {
    event.preventDefault()

    if (todoText.trim().length < 1) {
      setValidateText("Текст дела не должен быть пустым")
      setIsDisabledSubmit(true)
      return
    }

    try {
      const newTodo = await todosAPI.addTodo(todoText)
      setTodos((prevTodos) => [...prevTodos, newTodo])
      setTodoText("")
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error)
    }
  }

  // удаляем дело из списка
  const deleteTodo = async (todo, navigate) => {
    try {
      await todosAPI.removeTodo(todo.id)
      navigate("/")
    } catch (err) {
      console.error("Ошибка при удалении:", err)
    }
  }

  // сохраняем изменения
  const saveTitle = async (todo, editingText, setTodo, setEditing) => {
    try {
      await todosAPI.updateTodo(todo.id, { title: editingText })
      setTodo((prev) => ({ ...prev, title: editingText }))
      setEditing(false)
    } catch (err) {
      console.error("Ошибка при сохранении:", err)
    }
  }

  // изменение статуса дела
  const toggleCompleted = async (todo, setTodo) => {
    try {
      const updated = !todo.completed
      await todosAPI.updateTodo(todo.id, { completed: updated })
      setTodo((prev) => ({ ...prev, completed: updated }))
    } catch (err) {
      console.error("Ошибка при изменении статуса:", err)
    }
  }

  // поиск дела по запросу и сортировка
  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      isSorting ? (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) : 0
    )

  return {
    // получшение дела
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

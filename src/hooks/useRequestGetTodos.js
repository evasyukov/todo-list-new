import { useState, useEffect } from "react"
import { todosAPI } from "../api/api.todos"

export function useRequestGetTodos() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setErrorText(null)

    todosAPI
      .getTodos()
      .then((todoList) => {
        setTodos(todoList)
      })
      .catch((error) => {
        console.error("Ошибка при получении дел:", error)
        setErrorText("Ошибка загрузки списка дел")
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      })
  }, [])

  return { todos, isLoading, errorText }
}

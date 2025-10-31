import { useState, useEffect } from "react"

export function useRequestGetTodos(refresh) {
  const [todos, setTodos] = useState([]) // дела
  const [isLoading, SetIsLoading] = useState(true) // флаг для показа лоудера при отрисовке списка
  const [errorText, SetErrorText] = useState(null) // состояние ошибки при запросе

  useEffect(() => {
    SetIsLoading(true)

    fetch("http://localhost:3005/todos")
      .then((response) => response.json())
      .then((todoList) => {
        setTodos(todoList)
      })
      .catch((error) => {
        SetErrorText('Ошибка запроса')
        console.log(error)
      })
      .finally(() => {
        setTimeout(() => {
          SetIsLoading(false)
        }, 100) // сымитируем ситуацию запроса на сервер
      })
  }, [refresh])

  return { todos, isLoading, errorText }
}

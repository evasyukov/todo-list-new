import { todosAPI } from "../api/api.todos"

export function requestAddTodos(todoText) {
  todosAPI
    .addTodo(todoText)
    .then(() => {
      console.log("Дело добавлено успешно")
    })
    .catch((error) => {
      console.error("Ошибка при добавлении дела", error)
    })
}

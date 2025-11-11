import { todosAPI } from "../api/api.todos"

export function requestRemoveTodos(id) {
  todosAPI
    .removeTodo(id)
    .then(() => {
      console.log("Дело удалено успешно")
    })
    .catch((error) => {
      console.error("Ошибка при удалении дела", error)
    })
}

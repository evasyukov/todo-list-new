import { todosAPI } from "../api/api.todos"

export function requestUpdateTodos(id, updatedData) {
  todosAPI
    .updateTodo(id, updatedData)
    .then(() => {
      console.log("Дело обновлено успешно")
    })
    .catch((error) => {
      console.error("Ошибка при обновлении дела", error)
    })
}

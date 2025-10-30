export function requestUpdateTodos(id, updatedData, refreshTodos) {
  fetch(`http://localhost:3005/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  })
    .then(() => refreshTodos())
    .catch((error) => console.error("Ошибка при обновлении дела", error))
}

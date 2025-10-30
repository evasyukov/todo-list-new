export  function requestRemoveTodos(id, refreshTodos) {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "DELETE",
    })
      .then((responce) => responce.json())
      .then(() => refreshTodos())
      .catch((error) => console.error("Ошибка при удалении дела", error))
  }

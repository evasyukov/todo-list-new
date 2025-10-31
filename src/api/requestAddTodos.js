export function requestAddTodos(todoText, refreshTodos) {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todoText,
        completed: false,
      }),
    })
      .then((responce) => responce.json())
      .then(() => refreshTodos())
      .catch((error) => console.error("Ошибка при добавлении дела", error))
  }



const URL = "http://localhost:3005/todos"

export const todosAPI = {
  getTodos: async () => {
    const response = await fetch(URL)
    return await response.json()
  },
  getTodoById: async (id) => {
    const response = await fetch(`${URL}/${id}`)
    return await response.json()
  },
  addTodo: async (title) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    })
    return await response.json()
  },
  removeTodo: async (id) => {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    })
    return await response.json()
  },
  updateTodo: async (id, data) => {
    const response = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return await response.json()
  },
}

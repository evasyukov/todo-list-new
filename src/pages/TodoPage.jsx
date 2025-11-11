import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { todosAPI } from "../api/api.todos"
import { useTodos } from "../hooks/useTodos"
import { TodoId } from "../components"

export function TodoPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [todo, setTodo] = useState(null)                            // дело
  const [editing, setEditing] = useState(false)                     // флаг  редактирования
  const [editingText, setEditingText] = useState("")                // текст редактируемого дела
  const [loading, setLoading] = useState(true)                      // флаг  загрузки

  const { saveTitle, deleteTodo, toggleCompleted } = useTodos()     // хуки для работы с делами

  useEffect(() => {
    async function fetchTodo() {
      try {
        const todoId = await todosAPI.getTodoById(id)
        if (!todoId.title) {
          navigate("/NotFoundPage")
        } else {
          setTodo(todoId)
          setEditingText(todoId.title)
        }
      } catch {
        navigate("/NotFoundPage")
      } finally {
        setLoading(false)
      }
    }

    fetchTodo()
  }, [id, navigate])

  if (loading) return <div>Загрузка...</div>

  return (
    <TodoId
      todo={todo}
      editing={editing}
      editingText={editingText}
      setEditingText={setEditingText}
      setEditing={setEditing}
      saveTitle={() => saveTitle(todo, editingText, setTodo, setEditing)}
      deleteTodo={() => deleteTodo(todo, navigate)}
      toggleCompleted={() => toggleCompleted(todo, setTodo)}
      navigateBack={() => navigate(-1)}
    />
  )
}

import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { requestUpdateTodos, requestRemoveTodos } from "../api"
import "./TodoPage.css"

export default function TodoPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [todo, setTodo] = useState(null)
  const [editing, setEditing] = useState(false)
  const [editingText, setEditingText] = useState("")
  const [notFound, setNotFound] = useState(false) // 👈 добавляем флаг

  useEffect(() => {
    fetch(`http://localhost:3005/todos/${id}`)
      .then((response) => {
        if (!response.ok) {
          setNotFound(true)
        }
        return response.json()
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          // если пришел пустой объект
          setNotFound(true)
          return
        }
        setTodo(data)
        setEditingText(data.title)
      })
      .catch((err) => console.error("Ошибка при загрузке задачи:", err))
  }, [id])

  function saveTitle() {
    requestUpdateTodos(todo.id, { title: editingText }, () => {
      setTodo((prev) => ({ ...prev, title: editingText }))
      setEditing(false)
    })
  }

  function deleteTodo() {
    requestRemoveTodos(todo.id, () => navigate("/"))
  }

  function toggleCompleted() {
    requestUpdateTodos(todo.id, { completed: !todo.completed }, () =>
      setTodo((prev) => ({ ...prev, completed: !prev.completed }))
    )
  }

  // если задача не найдена
  if (notFound)
    return (
      <div className="todo-page">
        <Link to="/">Вернуться на главную</Link>
        <h2>Задачи не существует</h2>
      </div>
    )

  if (!todo) return <div>Загрузка...</div>

  return (
    <div className="todo-page">
      <button onClick={() => navigate(-1)}>← Назад</button>

      <div className="todo-id" key={todo.id}>
        <div className="todo-id__title" onClick={() => setEditing(true)}>
          {editing ? (
            <textarea
              value={editingText}
              onChange={(event) => setEditingText(event.target.value)}
              onBlur={saveTitle}
              autoFocus
            />
          ) : (
            todo.title
          )}
        </div>

        <div className="todo-id__management">
          <div
            className={`todo-id_completed ${todo.completed}`}
            onClick={toggleCompleted}
          >
            {todo.completed ? "выполнено" : "не выполнено"}
          </div>

          <div className="todo-id__buttons">
            <button onClick={() => setEditing(!editing)}>
              {editing ? "Сохранить" : "Редактировать"}
            </button>

            <button onClick={deleteTodo}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

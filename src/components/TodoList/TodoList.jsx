import { useNavigate } from "react-router-dom"

import './TodoList.css'

export default function TodoList({ todos, isLoading, errorText }) {
  const navigate = useNavigate()

  if (isLoading) return <div>Загрузка...</div>
  if (errorText) return <div>{errorText}</div>

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div
            className="todo__title"
            onClick={() => navigate(`/task/${todo.id}`)}
          >
            {todo.title}
          </div>

          <div className={`todo_completed ${todo.completed}`} >
            {todo.completed ? "выполнено" : "не выполнено"}
          </div>
        </div>
      ))}
    </div>
  )
}

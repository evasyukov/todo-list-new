import { Link } from "react-router-dom"

import "./TodoList.css"

export function TodoList({ todos, isLoading, errorText }) {
  if (isLoading) return <div>Загрузка...</div>
  if (errorText) return <div>{errorText}</div>

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <Link className="todo__title" to={`/task/${todo.id}`}>
            {todo.title}
          </Link>

          <div className={`todo_completed ${todo.completed}`}>
            {todo.completed ? "выполнено" : "не выполнено"}
          </div>
        </div>
      ))}
    </div>
  )
}

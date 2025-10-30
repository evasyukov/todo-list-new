export default function TodoList({
  todos,
  isLoading,
  errorText,
  editingId,
  editingText,
  handleTitleChange,
  saveTitle,
  startEditing,
  deleteTodo,
  toggleCompleted,
}) {
  if (isLoading) return <div>Загрузка...</div>
  if (errorText) return <div>{errorText}</div>

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo__title">
            {editingId === todo.id ? (
              <input
                value={editingText}
                onChange={handleTitleChange}
                onBlur={() => saveTitle(todo)}
                onKeyDown={(e) => e.key === "Enter" && saveTitle(todo)}
                autoFocus
              />
            ) : (
              todo.title
            )}
          </div>

          <div className="todo__management">
            <div
              className={`todo_completed ${todo.completed}`}
              onClick={() => toggleCompleted(todo)}
            >
              {todo.completed ? "выполнено" : "не выполнено"}
            </div>

            <div className="todo__buttons">
              <button onClick={() => startEditing(todo)}>Редактировать</button>
              <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

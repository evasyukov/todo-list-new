import "./TodoId.css"

export function TodoId({
  todo,
  editing,
  editingText,
  setEditingText,
  setEditing,
  saveTitle,
  deleteTodo,
  toggleCompleted,
  navigateBack,
}) {
  if (!todo) return <div>Загрузка...</div>

  return (
    <div className="todo-page">
      <button onClick={navigateBack}>Назад</button>

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
            className={`todo-id_status ${
              todo.completed ? "completed" : "not_completed"
            }`}
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

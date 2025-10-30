export default function AdditionForm({
  todoText,
  validateText,
  isDisabledSubmit,
  submitTodos,
  handleChange,
}) {
  return (
    <form className="add-todo" onSubmit={submitTodos}>
      <textarea
        className="add-todo__textarea"
        autoComplete="off"
        placeholder="Что поделаем?"
        rows="2"
        value={todoText}
        onInput={handleChange}
      />

      {validateText && <div className="validate-error">{validateText}</div>}

      <button
        className="add-todo_button"
        type="submit"
        disabled={isDisabledSubmit}
      >
        Добавить дело
      </button>
    </form>
  )
}
import { useTodos } from "../hooks"
import { AdditionForm, SortingTodoList, TodoList } from "../components"

export function HomePage() {
  const {
    todos,
    isLoading,
    errorText,
    todoText,
    handleChange,
    submitTodos,
    validateText,
    isDisabledSubmit,
    searchQuery,
    setSearchQuery,
    isSorting,
    setIsSorting,
  } = useTodos()

  return (
    <>
      <AdditionForm
        todoText={todoText}
        handleChange={handleChange}
        submitTodos={submitTodos}
        validateText={validateText}
        isDisabledSubmit={isDisabledSubmit}
      />

      <SortingTodoList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
      />

      <TodoList todos={todos} isLoading={isLoading} errorText={errorText} />
    </>
  )
}

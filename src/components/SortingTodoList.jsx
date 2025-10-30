export default function SortingTodoList({
  searchQuery,
  setSearchQuery,
  isSorting,
  setIsSorting,
}) {
  return (
    <div className="sorting">
      <input
        className="sorting__search"
        type="text"
        placeholder="Поиск дела"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <div className="sorting__abc">
        <label htmlFor="sorting">Сортировка по алфавиту</label>
        <input
          type="checkbox"
          id="sorting"
          checked={isSorting}
          onChange={(event) => setIsSorting(event.target.checked)}
        />
      </div>
    </div>
  )
}

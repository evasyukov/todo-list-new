import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>Страница не найдена</h2>
      <Link to="/">Вернуться на главную</Link>
    </div>
  )
}

export default NotFoundPage

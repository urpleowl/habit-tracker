import { NavLink } from 'react-router-dom'
import { AppRoutes } from './routes'

export function App() {
  return (
    <div className="container">
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'active' : undefined}
          end
        >
          Сегодня
        </NavLink>
        <NavLink
          to="/habits"
          className={({ isActive }) => isActive ? 'active' : undefined}
        >
          Привычки
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) => isActive ? 'active' : undefined}
        >
          Статистика
        </NavLink>
      </nav>

      <main>
        <AppRoutes />
      </main>
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { HabitsPage } from '../pages/HabitsPage'
import { HabitDetailPage } from '../pages/HabitDetailPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/habits" element={<HabitsPage />} />
      <Route path="/habits/:id" element={<HabitDetailPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

import { Route, Routes } from 'react-router-dom'

import { HabitDetailPage } from '../pages/HabitDetailPage'
import { HabitsPage } from '../pages/HabitsPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { StatisticsPage } from '../pages/StatisticsPage'

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

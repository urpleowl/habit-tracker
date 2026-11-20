import { HabitCard, ProgressBar, Card } from '@habit-tracker/ui'
import { useHabits } from '../context/HabitsContext'

export function HomePage() {
  const { habits, toggleHabit } = useHabits()

  const completedCount = habits.filter((h) => h.completedToday).length
  const overallProgress = habits.length > 0
    ? Math.round((completedCount / habits.length) * 100)
    : 0

  return (
    <div>
      <h1 className="page-title">Сегодня</h1>

      <Card title="Общий прогресс дня">
        <ProgressBar value={overallProgress} label="Выполнено привычек" />
        <p style={{ marginTop: '0.75rem', color: '#6b7280' }}>
          {completedCount} из {habits.length} привычек выполнено
        </p>
      </Card>

      <h2 style={{ margin: '1.5rem 0 1rem', fontSize: '1.25rem' }}>
        Привычки на сегодня
      </h2>

      {habits.length === 0 ? (
        <div className="placeholder">
          Пока нет привычек. Добавьте первую на странице «Привычки».
        </div>
      ) : (
        <div className="habits-grid">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
            />
          ))}
        </div>
      )}
    </div>
  )
}

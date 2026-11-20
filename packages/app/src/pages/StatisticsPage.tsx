import { Card, ProgressBar, BarChart } from '@habit-tracker/ui'
import { useHabits } from '../context/HabitsContext'

export function StatisticsPage() {
  const { habits } = useHabits()

  const totalHabits = habits.length
  const completedToday = habits.filter((h) => h.completedToday).length
  const avgProgress = totalHabits > 0
    ? Math.round(
      habits.reduce((sum, h) => sum + h.progress, 0) / totalHabits
    )
    : 0
  const maxStreak = totalHabits > 0
    ? Math.max(...habits.map((h) => h.streak))
    : 0
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0)

  const progressItems = [...habits]
    .sort((a, b) => b.progress - a.progress)
    .map((habit) => ({
      id: habit.id,
      label: habit.name,
      value: habit.progress,
      max: 100
    }))

  const streakItems = [...habits]
    .sort((a, b) => b.streak - a.streak)
    .map((habit) => ({
      id: habit.id,
      label: habit.name,
      value: habit.streak
    }))

  return (
    <div>
      <h1 className="page-title">Статистика</h1>

      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          marginBottom: '1.5rem'
        }}
      >
        <Card title="Сегодня">
          <ProgressBar
            value={totalHabits > 0
              ? Math.round((completedToday / totalHabits) * 100)
              : 0}
            label="Выполнено сегодня"
          />
          <p style={{ marginTop: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
            {completedToday} из {totalHabits} привычек
          </p>
        </Card>

        <Card title="Средний прогресс">
          <ProgressBar value={avgProgress} label="По всем привычкам" />
          <p style={{ marginTop: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Всего привычек: {totalHabits}
          </p>
        </Card>

        <Card title="Серии">
          <p style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>
            {maxStreak}
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', marginLeft: '0.35rem' }}>
              дней макс.
            </span>
          </p>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            Сумма серий: {totalStreak} дней
          </p>
        </Card>
      </div>

      {totalHabits === 0 ? (
        <Card>
          <p style={{ margin: 0, color: '#6b7280', textAlign: 'center' }}>
            Добавьте привычки, чтобы увидеть статистику и графики.
          </p>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
          }}
        >
          <Card>
            <BarChart
              title="Прогресс по привычкам"
              items={progressItems}
            />
          </Card>

          <Card>
            <BarChart
              title="Серии выполнения"
              items={streakItems}
            />
          </Card>
        </div>
      )}
    </div>
  )
}

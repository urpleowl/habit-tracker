import { useParams, Link } from 'react-router-dom'
import { Card, ProgressBar, Button } from '@habit-tracker/ui'
import { useHabits } from '../context/HabitsContext'

export function HabitDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getHabitById, toggleHabit, removeHabit } = useHabits()

  const habit = id ? getHabitById(id) : undefined

  if (!habit) {
    return (
      <div>
        <Link
          to="/habits"
          style={{ color: '#3b82f6', marginBottom: '1rem', display: 'inline-block' }}
        >
          ← Назад к списку
        </Link>
        <div className="placeholder">
          Привычка не найдена
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/habits"
        style={{ color: '#3b82f6', marginBottom: '1rem', display: 'inline-block' }}
      >
        ← Назад к списку
      </Link>

      <h1 className="page-title">{habit.name}</h1>

      <Card title="Детали привычки">
        <p style={{ margin: '0 0 0.5rem', color: '#6b7280' }}>
          Серия: <strong>{habit.streak}</strong> дней
        </p>
        <p style={{ margin: '0 0 1rem', color: '#6b7280' }}>
          Сегодня: {habit.completedToday ? 'выполнено' : 'не выполнено'}
        </p>

        <ProgressBar value={habit.progress} label="Прогресс" />

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <Button
            variant={habit.completedToday ? 'secondary' : 'primary'}
            onClick={() => toggleHabit(habit.id)}
          >
            {habit.completedToday ? 'Снять отметку' : 'Отметить выполненным'}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              removeHabit(habit.id)
            }}
          >
            Удалить
          </Button>
        </div>
      </Card>

      <div className="placeholder" style={{ marginTop: '1.5rem' }}>
        История выполнения (календарь / список дней) — будет реализовано позже
      </div>
    </div>
  )
}

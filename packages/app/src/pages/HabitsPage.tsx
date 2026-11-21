import { Button, Card } from '@habit-tracker/ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useHabits } from '../context/HabitsContext'

import type { FormEvent } from 'react'

export function HabitsPage() {
  const { habits, addHabit, removeHabit } = useHabits()
  const [name, setName] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addHabit(name)
    setName('')
    setIsFormOpen(false)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          Мои привычки
        </h1>
        <Button
          variant="primary"
          onClick={() => setIsFormOpen((prev) => !prev)}
        >
          {isFormOpen ? 'Отмена' : '+ Добавить'}
        </Button>
      </div>

      {isFormOpen && (
        <Card title="Новая привычка">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название привычки"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                marginBottom: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
              autoFocus
            />
            <Button type="submit" variant="primary" disabled={!name.trim()}>
              Создать
            </Button>
          </form>
        </Card>
      )}

      {habits.length === 0 ? (
        <div className="placeholder" style={{ marginTop: '1rem' }}>
          Список пуст. Создайте первую привычку.
        </div>
      ) : (
        <div className="habits-grid" style={{ marginTop: isFormOpen ? '1rem' : 0 }}>
          {habits.map((habit) => (
            <Card key={habit.id}>
              <h3 style={{ margin: '0 0 0.5rem' }}>{habit.name}</h3>
              <p style={{ margin: '0 0 1rem', color: '#6b7280' }}>
                Серия: {habit.streak} дней
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/habits/${habit.id}`}>
                  <Button variant="secondary">Подробнее</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => removeHabit(habit.id)}
                >
                  Удалить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

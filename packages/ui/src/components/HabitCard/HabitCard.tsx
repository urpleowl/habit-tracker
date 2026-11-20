import type { HabitCardProps } from '../../types'
import { Button } from '../Button'
import { Card } from '../Card'
import { ProgressBar } from '../ProgressBar'
import styles from './HabitCard.module.css'

export function HabitCard({ habit, onToggle }: HabitCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.name}>{habit.name}</h4>
        <span className={styles.streak}>🔥 {habit.streak}</span>
      </div>

      <ProgressBar
        value={habit.progress}
        label="Прогресс"
      />

      <div className={styles.actions}>
        <Button
          variant={habit.completedToday ? 'secondary' : 'primary'}
          onClick={() => onToggle(habit.id)}
        >
          {habit.completedToday ? 'Выполнено' : 'Отметить'}
        </Button>
      </div>
    </Card>
  )
}

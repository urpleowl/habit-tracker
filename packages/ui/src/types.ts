import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  className?: string
}

export interface Habit {
  id: string
  name: string
  completedToday: boolean
  streak: number
  progress: number
}

export interface HabitCardProps {
  habit: Habit
  onToggle: (id: string) => void
}

import type { Habit } from '@habit-tracker/ui'

const STORAGE_KEY = 'habit-tracker-habits'

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Зарядка утром',
    completedToday: false,
    streak: 5,
    progress: 70
  },
  {
    id: '2',
    name: 'Чтение 30 минут',
    completedToday: true,
    streak: 12,
    progress: 85
  },
  {
    id: '3',
    name: 'Пить воду',
    completedToday: false,
    streak: 3,
    progress: 40
  }
]

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return defaultHabits
    }

    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return defaultHabits
    }

    return parsed as Habit[]
  } catch {
    return defaultHabits
  }
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch {
    // ignore quota / private mode errors
  }
}

export function createHabitId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

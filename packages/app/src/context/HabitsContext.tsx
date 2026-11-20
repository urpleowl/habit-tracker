import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import type { Habit } from '@habit-tracker/ui'
import {
  createHabitId,
  loadHabits,
  saveHabits
} from '../storage/habitsStorage'

interface HabitsContextValue {
  habits: Habit[]
  toggleHabit: (id: string) => void
  addHabit: (name: string) => void
  removeHabit: (id: string) => void
  getHabitById: (id: string) => Habit | undefined
}

const HabitsContext = createContext<HabitsContextValue | null>(null)

interface HabitsProviderProps {
  children: ReactNode
}

export function HabitsProvider({ children }: HabitsProviderProps) {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const toggleHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) {
          return habit
        }

        const completedToday = !habit.completedToday

        return {
          ...habit,
          completedToday,
          streak: completedToday
            ? habit.streak + 1
            : Math.max(0, habit.streak - 1),
          progress: completedToday
            ? Math.min(100, habit.progress + 10)
            : Math.max(0, habit.progress - 10)
        }
      })
    )
  }, [])

  const addHabit = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }

    const newHabit: Habit = {
      id: createHabitId(),
      name: trimmed,
      completedToday: false,
      streak: 0,
      progress: 0
    }

    setHabits((prev) => [...prev, newHabit])
  }, [])

  const removeHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }, [])

  const getHabitById = useCallback(
    (id: string) => habits.find((habit) => habit.id === id),
    [habits]
  )

  const value = useMemo(
    () => ({
      habits,
      toggleHabit,
      addHabit,
      removeHabit,
      getHabitById
    }),
    [habits, toggleHabit, addHabit, removeHabit, getHabitById]
  )

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  )
}

export function useHabits(): HabitsContextValue {
  const context = useContext(HabitsContext)

  if (!context) {
    throw new Error('useHabits must be used within HabitsProvider')
  }

  return context
}

import styles from './BarChart.module.css'

import type { ReactNode } from 'react'

export interface BarChartItem {
  id: string
  label: string
  value: number
  max?: number
}

export interface BarChartProps {
  items: BarChartItem[]
  title?: string
  className?: string
  emptyMessage?: string
}

export function BarChart({
  items,
  title,
  className = '',
  emptyMessage = 'Нет данных для отображения'
}: BarChartProps) {
  if (items.length === 0) {
    return (
      <div className={`${styles.wrapper} ${className}`}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.empty}>{emptyMessage}</p>
      </div>
    )
  }

  const maxValue = Math.max(
    ...items.map((item) => item.max ?? item.value),
    1
  )

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ul className={styles.list}>
        {items.map((item) => {
          const percentage = Math.min(
            Math.max((item.value / maxValue) * 100, 0),
            100
          )

          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.labelRow}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.fill}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function BarChartLegend({ children }: { children: ReactNode }) {
  return <div className={styles.legend}>{children}</div>
}

import type { ProgressBarProps } from '../../types'
import styles from './ProgressBar.module.css'

export function ProgressBar({
  value,
  max = 100,
  label,
  className = ''
}: ProgressBarProps) {
  const safeMax = max <= 0 ? 100 : max
  const percentage = Math.min(Math.max((value / safeMax) * 100, 0), 100)
  const displayValue = Math.round(percentage)

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{displayValue}%</span>
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={displayValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

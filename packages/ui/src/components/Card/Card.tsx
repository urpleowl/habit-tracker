import styles from './Card.module.css'

import type { CardProps } from '../../types'

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

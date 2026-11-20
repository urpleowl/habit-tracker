import type { ButtonProps } from '../../types'
import styles from './Button.module.css'

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

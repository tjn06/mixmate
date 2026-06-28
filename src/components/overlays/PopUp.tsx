import { useEffect, useRef, useState } from 'react'
import * as styles from './PopUp.css'

const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function PopUp() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector)

    focusable?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }

      if (event.key !== 'Tab') return

      const elements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      ).filter((el) => !el.hasAttribute('disabled'))

      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button ref={triggerRef} className={styles.trigger} onClick={() => setOpen(true)}>
        Open popup
      </button>

      {open && (
        <div className={styles.backdrop} onMouseDown={close}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            tabIndex={-1}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 id="popup-title" className={styles.title}>
                Popup title
              </h2>

              <button className={styles.closeButton} onClick={close} aria-label="Close popup">
                ×
              </button>
            </div>

            <p>
              This is your overlay content. Put forms, menus, confirmations, or custom content here.
            </p>

            <div className={styles.actions}>
              <button onClick={close}>Cancel</button>
              <button onClick={close}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

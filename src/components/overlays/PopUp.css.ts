import { style } from '@vanilla-extract/css'

export const trigger = style({
  padding: '0.625rem 1rem',
  borderRadius: 8,
  border: '1px solid #ccc',
  cursor: 'pointer',
})

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  background: 'rgba(0, 0, 0, 0.45)',
  display: 'grid',
  placeItems: 'center',
  padding: 16,
})

export const dialog = style({
  width: 'min(100%, 420px)',
  maxHeight: '90vh',
  overflow: 'auto',
  borderRadius: 12,
  background: 'white',
  padding: 24,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
  outline: 'none',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
  alignItems: 'center',
  marginBottom: 16,
})

export const title = style({
  margin: 0,
  fontSize: 20,
})

export const closeButton = style({
  border: 0,
  background: 'transparent',
  fontSize: 24,
  cursor: 'pointer',
  lineHeight: 1,
})

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
  marginTop: 24,
})

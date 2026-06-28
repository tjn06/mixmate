import { style } from '@vanilla-extract/css'

export const shell = style({
  height: '100svh',
  minHeight: 0,
  overflow: 'hidden',
  padding: 'clamp(4px, 1svh, 8px)',
  boxSizing: 'border-box',
  background: '#000',
  display: 'flex',
})

export const calculator = style({
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
  display: 'grid',
  gridTemplateRows: '0.8fr 4.4fr 10fr',
  gap: 'clamp(2px, 0.5svh, 5px)',
})

export const header = style({
  minHeight: 0,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  fontSize: 'clamp(12px, 2.4svh, 18px)',
  lineHeight: 1,
})

export const results = style({
  minHeight: 0,
  overflow: 'hidden',
  color: '#fff',
  display: 'grid',
  gridTemplateRows: 'auto 1fr 1fr 1fr',
  gap: 'clamp(2px, 0.45svh, 5px)',
})

export const details = style({
  minHeight: 0,
  overflow: 'hidden',
  fontSize: 'clamp(10px, 1.8svh, 14px)',
  lineHeight: 1,
})

export const resultRow = style({
  minHeight: 0,
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
  gap: 'clamp(2px, 0.45svh, 5px)',
})

export const resultCard = style({
  minHeight: 0,
  overflow: 'hidden',
  borderRadius: 'clamp(6px, 10cqmin, 14px)',
  background: '#1f1f1f',
  color: '#fff',
  display: 'grid',
  gridTemplateRows: '1fr 1.2fr 1fr',
  alignItems: 'center',
  justifyItems: 'center',
  containerType: 'size',
  padding: 'clamp(2px, 0.5cqmin, 6px)',
  boxSizing: 'border-box',
})

export const resultLabel = style({
  fontSize: 'clamp(8px, 16cqmin, 14px)',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
})

export const resultValue = style({
  fontSize: 'clamp(12px, 28cqmin, 24px)',
  lineHeight: 1,
})

export const resultUnit = style({
  fontSize: 'clamp(8px, 14cqmin, 12px)',
  lineHeight: 1,
})

export const buttons = style({
  minHeight: 0,
  overflow: 'hidden',
  display: 'grid',
  gridTemplateRows: 'repeat(10, minmax(0, 1fr))',
  gap: 'clamp(2px, 0.45svh, 5px)',
})

export const buttonRow = style({
  minHeight: 0,
  overflow: 'hidden',
  display: 'flex',
  gap: 'clamp(2px, 0.45svh, 5px)',
})

export const button = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  height: '100%',
  border: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#333',
  color: '#fff',
  borderRadius: 'clamp(6px, 12cqmin, 16px)',
  containerType: 'size',
})

export const buttonSmall = style([
  button,
  {
    flex: 0.7,
  },
])

export const buttonText = style({
  display: 'block',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1,
  fontSize: 'clamp(10px, 32cqmin, 24px)',
})

export const smallButtonText = style({
  display: 'block',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1,
  fontSize: 'clamp(9px, 24cqmin, 18px)',
})

export const input = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  height: '100%',
  border: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: '#333',
  color: '#fff',
  borderRadius: 'clamp(6px, 12cqmin, 16px)',
  textAlign: 'center',
  fontSize: 'clamp(10px, 32cqmin, 24px)',
})

export const select = style({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  height: '100%',
  border: 0,
  padding: '0 clamp(6px, 1cqmin, 10px)',
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: '#333',
  color: '#fff',
  borderRadius: 'clamp(6px, 12cqmin, 16px)',
  textAlign: 'center',
  fontSize: 'clamp(9px, 22cqmin, 18px)',
})
import { formatKg, type CalculationResult } from '../calculations/calculator'
import { useCalculatorStore } from '../store/calculatorStore'

type Props = {
  result: CalculationResult
}

export function StickyResult({ result }: Props) {
  const dismissSticky = useCalculatorStore((state) => state.dismissSticky)

  return (
    <div className="sticky">
      <button className="sticky-close" onClick={dismissSticky}>
        ×
      </button>

      {[...result.binderItems, ...result.additiveItems].map((item) => (
        <span key={item.id}>
          <b>{item.name}</b> {formatKg(item.weight)} kg
        </span>
      ))}
    </div>
  )
}

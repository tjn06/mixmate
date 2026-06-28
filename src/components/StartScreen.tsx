import { useCalculatorStore } from '../store/calculatorStore'
import type { CalcMode } from '../calculations/calculator'

const modes: {
  mode: CalcMode
  title: string
  description: string
  example: string
}[] = [
  {
    mode: 'totalWithAdditives',
    title: 'Total vikt med tillägg',
    description: 'Du vet färdig totalvikt inklusive sand, vatten eller tixotrop.',
    example: 'Ex: 45,50 kg färdig massa',
  },
  {
    mode: 'binder',
    title: 'Färdig mängd epoxy A+B',
    description: 'Du vet hur mycket bindare du vill blanda.',
    example: 'Ex: 7,00 kg A+B',
  },
  {
    mode: 'component',
    title: 'Vikt på komponent',
    description: 'Du vet vikten på A, B eller annan bindarkomponent.',
    example: 'Ex: A = 2,50 kg',
  },
]

export function StartScreen() {
  const startCalculation = useCalculatorStore((state) => state.startCalculation)
  const rememberLastScreen = useCalculatorStore((state) => state.rememberLastScreen)
  const toggleRememberLastScreen = useCalculatorStore((state) => state.toggleRememberLastScreen)

  return (
    <main className="app start">
      <header className="start-header">
        <p className="eyebrow">Epoxy Calc</p>
        <h1>Vad vill du räkna ut?</h1>
        <p>
          Välj beräkningssätt först. Då blir inputen tydlig och resultatet kan uppdateras direkt.
        </p>
      </header>

      <section className="mode-list">
        {modes.map((item) => (
          <button key={item.mode} className="mode-card" onClick={() => startCalculation(item.mode)}>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
            <small>{item.example}</small>
          </button>
        ))}
      </section>

      <label className="remember-row">
        <input type="checkbox" checked={rememberLastScreen} onChange={toggleRememberLastScreen} />
        Kom ihåg senaste skärm
      </label>
    </main>
  )
}

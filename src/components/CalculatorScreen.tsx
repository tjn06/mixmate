import { useEffect, useRef, useState } from "react"
import { useCalculatorStore } from "../store/calculatorStore"
import { RecipeCard } from "./RecipeCard"
import { ResultPanel } from "./ResultPanel"
import { StickyResult } from "./StickyResult"

function getInputLabel(mode: string, componentName?: string) {
  if (mode === "totalWithAdditives") return "Total vikt med tillägg"
  if (mode === "binder") return "Färdig mängd epoxy A+B"
  return `Vikt ${componentName ?? "komponent"}`
}

function getModeTitle(mode: string) {
  if (mode === "totalWithAdditives") return "Total vikt med tillägg"
  if (mode === "binder") return "Färdig mängd epoxy A+B"
  if (mode === "componentA") return "Vikt på komponent A"
  if (mode === "componentB") return "Vikt på komponent B"
  if (mode === "componentC") return "Vikt på komponent C"
  if (mode === "componentD") return "Vikt på komponent D"
  return "Vikt på komponent"
}

export function CalculatorScreen() {
  const resultRef = useRef<HTMLDivElement | null>(null)
  const [originalVisible, setOriginalVisible] = useState(true)

  const {
    mode,
    knownWeight,
    knownComponentId,
    binders,
    result,
    stickyDismissed,
    goToStart,
    setKnownWeight,
    setKnownComponentId,
  } = useCalculatorStore()

  const selectedComponent = binders.find((item) => item.id === knownComponentId)

  useEffect(() => {
    const element = resultRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setOriginalVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  /* const showSticky = result && !originalVisible && !stickyDismissed */

  return (
    <main className="app">
      <header className="header">
        <button className="icon-button" onClick={goToStart}>
          ←
        </button>
        <h1>{getModeTitle(mode)}</h1>
        <button className="icon-button">⋮</button>
      </header>

      <div ref={resultRef}>
        <ResultPanel result={result} />
      </div>

      <section className="section">
        <h2>{getInputLabel(mode, selectedComponent?.name)}</h2>

        {mode === "component" && (
          <select
            className="select"
            value={knownComponentId}
            onChange={(event) => setKnownComponentId(event.target.value)}
          >
            {binders.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        <div className="weight-row">
          <input
            value={knownWeight}
            onChange={(event) => setKnownWeight(event.target.value)}
          />
          <span>kg</span>
        </div>
      </section>

      <RecipeCard />

      {/* {showSticky && result && <StickyResult result={result} />} */}
    </main>
  )
}
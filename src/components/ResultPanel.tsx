import { formatKg, type CalculationResult } from '../calculations/calculator'

type Props = {
  result: CalculationResult | null
}

export function ResultPanel({ result }: Props) {
  return (
    <section className="result-panel">
      <div className="report-top">
        <details className="details">
          <summary>Visa exakt uträkning</summary>
          {result?.steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </details>
        <div className="result-top">
          <strong className="status">{result ? '✓' : '✗'}</strong>
          <p>{result?.calculatedAt ?? '--:--:--'}</p>
        </div>
      </div>
      {!result ? (
        <p className="empty">Fyll i vikt för att visa resultat.</p>
      ) : (
        <>
          {result.additiveItems.length > 0 && <div className="divider" />}

          <div className="result-grid">
            {result.binderItems.map((item) => (
              <div className="result-card compact binder" key={item.id}>
                <div className="result-label gray">
                  <span>{item.name}</span>
                </div>
                <strong>{formatKg(item.weight)}</strong>
                <span>kg</span>
              </div>
            ))}
          </div>

          <div className="result-grid">
            {result.additiveItems.map((item) => (
              <div className="result-card compact additive" key={item.id}>
                <div className="result-label gray">
                  <span>{item.name}</span>
                </div>
                <strong>{formatKg(item.weight)}</strong>
                <span>kg</span>
              </div>
            ))}
          </div>

          <div className="total-card">
            <span>Totalt</span>
            <strong>{formatKg(result.totalWeight)}</strong>
            <span>kg</span>
          </div>
        </>
      )}
    </section>
  )
}
/*import { formatKg, type CalculationResult } from "../calculations/calculator"

type Props = {
  result: CalculationResult | null
}

export function ResultPanel({ result }: Props) {
  return (
    <section className="result-panel">
      <div className="result-top">
        <div>
          <strong className="status">
            {result ? "✓ UPPDATERAD" : "EJ BERÄKNAD"}
          </strong>
          <p>{result?.calculatedAt ?? "--:--:--"}</p>
        </div>
      </div>

      {!result ? (
        <p className="empty">Fyll i vikt för att visa resultat.</p>
      ) : (
        <>
          <div className="result-grid">
            {result.binderItems.map((item) => (
              <div className="result-card" key={item.id}>
                <div className={`result-label ${item.color}`}>{item.name}</div>
                <strong>{formatKg(item.weight)}</strong>
                <span>kg</span>
              </div>
            ))}
          </div>

          {result.additiveItems.length > 0 && <div className="divider" />}

          <div className="result-grid">
            {result.additiveItems.map((item) => (
              <div className="result-card additive" key={item.id}>
                <div className="result-label gray">{item.name}</div>
                <strong>{formatKg(item.weight)}</strong>
                <span>kg</span>
              </div>
            ))}
          </div>

          <div className="total-card">
            <span>TOTALT</span>
            <strong>{formatKg(result.totalWeight)}</strong>
            <span>kg</span>
          </div>

          <details className="details">
            <summary>Visa exakt uträkning</summary>
            {result.steps.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </details>
        </>
      )}
    </section>
  )
}
  */

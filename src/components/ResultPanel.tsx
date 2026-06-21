import { formatKg, type CalculationResult } from "../calculations/calculator"

type Props = {
  result: CalculationResult | null
}

export function ResultPanel({ result }: Props) {
  return (
    <section className="result-panel">
      <div className="result-top">
        <div>
          <strong className="status">
            {result ? "✓ Uppdaterad" : "Ej beräknad"}
          </strong>
          <p>{result?.calculatedAt ?? "--:--:--"}</p>
        </div>
      </div>

      {!result ? (
        <p className="empty">Fyll i vikt för att visa resultat.</p>
      ) : (
        <>
          <div className="binder-ratio-grid">
            {result.binderItems.map((item, index) => (
              <div className="ratio-wrap" key={item.id}>
                {index > 0 && <div className="ratio-colon">:</div>}

                <div className="result-card compact">
                  <div className={`result-label ${item.color}`}>
                    {index === 0 ? (
                      <>
                        <span>{item.name}</span>
                        <span>{item.parts}</span>
                      </>
                    ) : (
                      <>
                        <span>{item.name}</span>
                        <span>{item.parts} delar)</span>
                      </>
                    )}
                  </div>

                  <strong>{formatKg(item.weight)}</strong>
                  <span>kg</span>
                </div>
              </div>
            ))}
          </div>

          {result.additiveItems.length > 0 && <div className="divider" />}

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
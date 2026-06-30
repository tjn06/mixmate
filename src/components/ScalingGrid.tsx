import * as styles from './ScalingGrid.css'
import { useCalculatorStore } from '../store/calculatorStore'
import { formatKg } from '../calculations/calculator'

export function ScalingGrid() {
  const {
    selectedRecipeId,
    recipeLocked,
    selectRecipe,
    addBinder,
    addAdditive,
    mode,
    knownWeight,
    knownComponentId,
    binders,
    result,
    setKnownWeight,
    setKnownComponentId,
  } = useCalculatorStore()

  function handleAdditive(type: 'sand' | 'water' | 'thixotrope' | 'custom') {
    addAdditive(type)
  }

  return (
    <main className={styles.shell}>
      <section className={styles.calculator}>
        <header className={styles.header}>Calculator</header>

        <div className={styles.results}>
          <details className={styles.details}>
            <summary>Visa exakt uträkning</summary>
            {result.steps.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </details>

          <div className={styles.resultRow}>
            {result.binderItems.map((item) => (
              <div className={styles.resultCard} key={item.id}>
                <span className={styles.resultLabel}>{item.name}</span>
                <strong className={styles.resultValue}>{item.weight}</strong>
                <span className={styles.resultUnit}>kg</span>
              </div>
            ))}
          </div>

          <div className={styles.resultRow}>
            {result.additiveItems.map((item) => (
              <div className={styles.resultCard} key={item.id}>
                <span className={styles.resultLabel}>{item.name}</span>
                <strong className={styles.resultValue}>{item.weight}</strong>
                <span className={styles.resultUnit}>kg</span>
              </div>
            ))}
          </div>

          <div className={styles.resultRow}>
            <div className={styles.resultCard}>
              <span className={styles.resultLabel}>Totalt</span>
              <strong className={styles.resultValue}>
                {formatKg(result.totalWeight)}
              </strong>
              <span className={styles.resultUnit}>kg</span>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          {mode === 'component' ? (
            <div className={styles.buttonRow}>
              <select
                className={styles.select}
                value={knownComponentId}
                onChange={(event) => setKnownComponentId(event.target.value)}
              >
                {binders.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className={styles.buttonRow} />
          )}

          <div className={styles.buttonRow}>
            <input
              className={styles.input}
              value={knownWeight}
              onChange={(event) => setKnownWeight(event.target.value)}
            />
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>kg</span>
            </button>
          </div>

          <div className={styles.buttonRow}>
            <select
              className={styles.select}
              value={selectedRecipeId ?? 'custom'}
              onChange={(event) =>
                selectRecipe(
                  event.target.value as 'custom' | 'repair-standard' | 'sockel-fas',
                )
              }
            >
              <option value="custom">✏️ Valfri (Recept)</option>
              <option value="repair-standard">🔒 Standard lagning (Recept)</option>
              <option value="sockel-fas">🔒 Sockel / Fas (Recept)</option>
            </select>
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>A</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>2</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>B</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>1</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>C</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>2</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>D</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>1</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
          </div>

          <div className={styles.buttonRow}>
            {!recipeLocked && (
              <button className={styles.button} type="button" onClick={addBinder}>
                <span className={styles.buttonText}>+ Bindarkomponent</span>
              </button>
            )}
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>A</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>2</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>B</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>1</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>C</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>2</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>D</span>
            </button>
            <button className={styles.button} type="button">
              <span className={styles.buttonText}>1</span>
            </button>
            <button className={styles.buttonSmall} type="button">
              <span className={styles.smallButtonText}>delar</span>
            </button>
          </div>

          <div className={styles.buttonRow}>
            {!recipeLocked && (
              <select
                className={styles.select}
                value=""
                onChange={(event) => {
                  const value = event.target.value as
                    | ''
                    | 'sand'
                    | 'water'
                    | 'thixotrope'
                    | 'custom'

                  if (!value) return

                  handleAdditive(value)
                  event.currentTarget.value = ''
                }}
              >
                <option value="">+ Tillägg</option>
                <option value="sand">Sand</option>
                <option value="water">Vatten</option>
                <option value="thixotrope">Thixo</option>
                <option value="custom">Egen</option>
              </select>
            )}
          </div>

          <div className={styles.buttonRow} />
        </div>
      </section>
    </main>
  )
}
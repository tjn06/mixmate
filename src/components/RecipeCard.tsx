import { useState } from "react"
import { useCalculatorStore } from "../store/calculatorStore"

export function RecipeCard() {
  const [menuOpen, setMenuOpen] = useState(false)

  const {
    selectedRecipeId,
    recipeLocked,
    binders,
    additives,

    selectRecipe,

    setBinderName,
    setBinderParts,
    addBinder,
    removeBinder,

    setAdditiveName,
    setAdditivePercent,
    addAdditive,
    removeAdditive,
  } = useCalculatorStore()

  function handleAdditive(type: "sand" | "water" | "thixotrope" | "custom") {
    addAdditive(type)
    setMenuOpen(false)
  }

  return (
    <section className="section">
      <div className="section-title">
        <h2>BLANDNING</h2>
        {recipeLocked && <span className="locked-badge">🔒 Låst</span>}
      </div>

      <label className="recipe-select-label">
        Välj recept
        <select
          className="select"
          value={selectedRecipeId}
          onChange={(event) =>
            selectRecipe(
              event.target.value as
                | "custom"
                | "repair-standard"
                | "sockel-fas"
            )
          }
        >
          <option value="custom">Valfri</option>
          <option value="repair-standard">🔒 Lagning standard</option>
          <option value="sockel-fas">🔒 Sockel / Fas</option>
        </select>
      </label>

      <div className="recipe-list">
        {binders.map((item) => (
          <div className="recipe-row" key={item.id}>
            <input
              className={`name-input ${item.color}`}
              value={item.name}
              disabled={recipeLocked}
              onChange={(event) => setBinderName(item.id, event.target.value)}
            />

            <input
              value={item.parts}
              disabled={recipeLocked}
              onChange={(event) => setBinderParts(item.id, event.target.value)}
            />

            <span>delar</span>

            <button
              className="remove-button"
              onClick={() => removeBinder(item.id)}
              disabled={recipeLocked || binders.length <= 2}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {!recipeLocked && (
        <button className="outline-button" onClick={addBinder}>
          + Bindarkomponent
        </button>
      )}

      <div className="divider" />

      <div className="recipe-list">
        {additives.map((item) => (
          <div className="recipe-row" key={item.id}>
            <input
              className="additive-name"
              value={item.name}
              disabled={recipeLocked}
              onChange={(event) => setAdditiveName(item.id, event.target.value)}
            />

            <input
              value={item.percentOfBinder}
              disabled={recipeLocked}
              onChange={(event) =>
                setAdditivePercent(item.id, event.target.value)
              }
            />

            <span>%</span>

            <button
              className="remove-button"
              onClick={() => removeAdditive(item.id)}
              disabled={recipeLocked}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {!recipeLocked && (
        <div className="additive-menu-wrap">
          <button
            className="outline-button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            + Tillägg
          </button>

          {menuOpen && (
            <div className="additive-menu">
              <button onClick={() => handleAdditive("sand")}>Sand</button>
              <button onClick={() => handleAdditive("water")}>Vatten</button>
              <button onClick={() => handleAdditive("thixotrope")}>
                Tixotrop
              </button>
              <button onClick={() => handleAdditive("custom")}>
                Nytt tillägg
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
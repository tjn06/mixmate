import { Fragment, useState } from 'react'
import { Trash2 } from 'lucide-react'
import * as styles from './ScalingGridV2.css'

type BinderKey = 'A' | 'B' | 'C' | 'D'

type AdditiveKind = 'sand' | 'water' | 'thixotrope' | 'custom'

type RatioUnit = 'delar' | '%'

type WeightUnit = 'kg'

type RecipeId = 'custom' | 'repair-standard' | 'sockel-fas'

type NameUnitBinder = 'bas' | 'härdare' | 'filler' | 'custom'

type NameUnitAdditive = 'sand' | 'water' | 'thixotrope' | 'custom'

type CombinedNameUnit = NameUnitBinder | NameUnitAdditive

type KnownWeightMode = 'totalWithAdditives' | 'visibleBindersTotal' | `component:${BinderKey}`

type RatioItem = Readonly<{
  id: string
  label: string
  value: string
  unit: RatioUnit
  nameUnit: CombinedNameUnit
  removable: boolean
}>

type ResultItem = Readonly<{
  id: string
  label: string
  value: string
  unit: WeightUnit
  nameUnit: CombinedNameUnit
  removable: boolean
}>

const binderKeys = ['A', 'B', 'C', 'D'] as const satisfies readonly BinderKey[]

const initialBinders: readonly RatioItem[] = [
  {
    id: 'binder-a',
    label: 'A',
    value: '2',
    unit: 'delar',
    nameUnit: 'bas',
    removable: false,
  },
  {
    id: 'binder-b',
    label: 'B',
    value: '1',
    unit: 'delar',
    nameUnit: 'härdare',
    removable: false,
  },
]

const initialAdditives: readonly RatioItem[] = [
  {
    id: 'additive-sand',
    label: 'Sand',
    value: '2',
    unit: '%',
    nameUnit: 'sand',
    removable: false,
  },
]

type AppSelectPlacement = 'up' | 'down'

type AppSelectOption<Value extends string> = Readonly<{
  value: Value
  label: string
}>

const recipeOptions = [
  { value: 'custom', label: '✏️ Valfri' },
  { value: 'repair-standard', label: '🔒 Lagning standard' },
  { value: 'sockel-fas', label: '🔒 Sockel / Fas' },
] as const satisfies readonly AppSelectOption<RecipeId>[]


const additiveOptions = [
  { value: 'sand', label: 'Sand' },
  { value: 'water', label: 'Vatten' },
  { value: 'thixotrope', label: 'Tixo' },
  { value: 'custom', label: 'Egen' },
] as const satisfies readonly AppSelectOption<AdditiveKind>[]

function getKnownWeightModeOptions(
  binders: readonly RatioItem[]
): readonly AppSelectOption<KnownWeightMode>[] {
  const visibleBinderLabels = binders.map((binder) => binder.label).join('+')

  return [
    {
      value: 'totalWithAdditives',
      label: 'Total vikt med tillägg',
    },
    {
      value: 'visibleBindersTotal',
      label: `Färdig mängd epoxy ${visibleBinderLabels}`,
    },
    ...binders.map((binder) => ({
      value: `component:${binder.label as BinderKey}` as const,
      label: `Vikt på komponent ${binder.label}`,
    })),
  ]
}

function isBinderKey(value: string): value is BinderKey {
  return binderKeys.includes(value as BinderKey)
}

function isRecipeId(value: string): value is RecipeId {
  return value === 'custom' || value === 'repair-standard' || value === 'sockel-fas'
}

function isAdditiveKind(value: string): value is AdditiveKind {
  return value === 'sand' || value === 'water' || value === 'thixotrope' || value === 'custom'
}

function canDeleteBinder(binder: RatioItem, binders: readonly RatioItem[]): boolean {
  if (binder.label === 'A' || binder.label === 'B') {
    return false
  }

  return binders[binders.length - 1]?.id === binder.id
}

function createNextBinder(currentBinders: readonly RatioItem[]): RatioItem | null {
  const labels = new Set(currentBinders.map((binder) => binder.label))

  if (!labels.has('C')) {
    return {
      id: 'binder-c',
      label: 'C',
      value: '1',
      unit: 'delar',
      nameUnit: 'filler',
      removable: false,
    }
  }

  if (!labels.has('D')) {
    return {
      id: 'binder-d',
      label: 'D',
      value: '1',
      unit: 'delar',
      nameUnit: 'custom',
      removable: false,
    }
  }

  return null
}

function RecipeSelectControl({
  value,
  onChange,
}: Readonly<{
  value: RecipeId
  onChange: (value: RecipeId) => void
}>) {
  return (
    <AppSelect
      id="recipe-select"
      label="Recept"
      value={value}
      placeholder="Recept"
      options={recipeOptions}
      placement="down"
      onChange={onChange}
    />
  )
}

function KnownWeightModeSelectControl({
  value,
  binders,
  onChange,
}: Readonly<{
  value: KnownWeightMode
  binders: readonly RatioItem[]
  onChange: (value: KnownWeightMode) => void
}>) {
  return (
    <AppSelect
      id="known-weight-mode-select"
      label="Vad anger vikten?"
      value={value}
      placeholder="Vad anger vikten?"
      options={getKnownWeightModeOptions(binders)}
      placement="down"
      onChange={onChange}
    />
  )
}

function AdditiveSelectControl({
  additives,
  onChange,
}: Readonly<{
  additives: readonly RatioItem[]
  onChange: (value: AdditiveKind) => void
}>) {
  const usedKinds = new Set(additives.map((item) => item.nameUnit))
  const availableOptions = additiveOptions.filter((option) => !usedKinds.has(option.value))

  if (availableOptions.length === 0) {
    return (
      <button className={styles.selectActionControl} type="button" disabled>
        + Tillägg
      </button>
    )
  }

  return (
    <AppSelect
      id="additive-select"
      label="Lägg till tillägg"
      value={null}
      placeholder="+ Tillägg"
      options={availableOptions}
      placement="up"
      onChange={onChange}
    />
  )
}

function AppSelect<Value extends string>({
  id,
  label,
  value,
  placeholder = 'Välj',
  options,
  placement,
  onChange,
}: Readonly<{
  id: string
  label: string
  value: Value | null
  placeholder?: string
  options: readonly AppSelectOption<Value>[]
  placement: AppSelectPlacement
  onChange: (value: Value) => void
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const selectedOption =
    value === null ? undefined : options.find((option) => option.value === value)

  const displayValue = selectedOption?.label ?? placeholder
  const panelId = `${id}-panel`

  const panelClassName =
    placement === 'up'
      ? `${styles.appSelectPanel} ${styles.appSelectPanelUp}`
      : `${styles.appSelectPanel} ${styles.appSelectPanelDown}`

  return (
    <div
      className={styles.appSelectRoot}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget

        if (!(nextTarget instanceof Node)) {
          setIsOpen(false)
          return
        }

        if (!event.currentTarget.contains(nextTarget)) {
          setIsOpen(false)
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false)
        }
      }}
    >
      <button
        className={styles.appSelectTrigger}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={styles.appSelectTriggerText}>{displayValue}</span>
        <span className={styles.appSelectChevron} aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className={panelClassName} role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option.value}
              className={styles.appSelectOption}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ResultRowsGrid({
  binderItems,
  additiveItems,
}: Readonly<{
  binderItems: readonly ResultItem[]
  additiveItems: readonly ResultItem[]
}>) {
  return (
    <div className={styles.resultRowsGrid}>
      <div className={styles.binderResultRow}>
        {binderItems.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>

      {additiveItems.length > 0 && (
        <div className={styles.additiveResultRow}>
          {additiveItems.map((item) => (
            <ResultCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ScalingGridV2() {
  const [knownWeightMode, setKnownWeightMode] = useState<KnownWeightMode>('visibleBindersTotal')
  const [knownWeight, setKnownWeight] = useState<string>('15')
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeId>('custom')

  const [binders, setBinders] = useState<readonly RatioItem[]>(initialBinders)
  const [additives, setAdditives] = useState<readonly RatioItem[]>(initialAdditives)

  function updateBinderValue(id: string, value: string): void {
    setBinders((items) => items.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  function updateAdditiveValue(id: string, value: string): void {
    setAdditives((items) => items.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  function addBinder(): void {
    setBinders((currentBinders) => {
      const nextBinder = createNextBinder(currentBinders)

      if (!nextBinder) {
        return currentBinders
      }

      return [...currentBinders, nextBinder]
    })
  }

  function deleteBinder(id: string): void {
    setBinders((currentBinders) => {
      const binder = currentBinders.find((item) => item.id === id)

      if (!binder || !canDeleteBinder(binder, currentBinders)) {
        return currentBinders
      }

      return currentBinders.filter((item) => item.id !== id)
    })
  }

  function addAdditive(kind: AdditiveKind): void {
    setAdditives((currentAdditives) => {
      if (currentAdditives.length >= 4) {
        return currentAdditives
      }

      if (currentAdditives.some((item) => item.nameUnit === kind)) {
        return currentAdditives
      }

      const option = additiveOptions.find((entry) => entry.value === kind)

      if (!option) {
        return currentAdditives
      }

      return [
        ...currentAdditives,
        {
          id: `additive-${kind}`,
          label: option.label,
          value: '1',
          unit: '%',
          nameUnit: kind,
          removable: false,
        },
      ]
    })
  }

  function deleteAdditive(id: string): void {
    setAdditives((currentAdditives) => currentAdditives.filter((item) => item.id !== id))
  }

  const binderResultItems: readonly ResultItem[] = binders.map((binder) => ({
    id: `result-${binder.id}`,
    label: binder.label,
    nameUnit: binder.nameUnit,
    value: '10.0',
    removable: false,
    unit: 'kg',
  }))

  const additiveResultItems: readonly ResultItem[] = additives.map((additive) => ({
    id: `result-${additive.id}`,
    label: additive.label,
    nameUnit: additive.nameUnit,
    value: '5.0',
    removable: true,
    unit: 'kg',
  }))

  return (
    <main className={styles.pageFrame}>
      <section className={styles.mobileViewport} aria-label="Calculator app">
        <div className={styles.appScrollLayer}>
          <div className={styles.calculatorGrid}>
            <header className={styles.headerArea}>
              <h1 className={styles.appTitle}>Calculator</h1>
            </header>

            <section className={styles.resultsArea} aria-label="Resultat">
              <button className={styles.resultDisclosureControl} type="button">
                Visa exakt uträkning
              </button>

              <ResultRowsGrid
                binderItems={binderResultItems}
                additiveItems={additiveResultItems}
              />

              <article className={styles.totalResultCard}>
                <span className={styles.resultLabel}>Totalt</span>
                <strong className={styles.resultValue}>30.0</strong>
                <span className={styles.resultUnit}>kg</span>
              </article>
            </section>

            <section
              className={styles.knownComponentArea}
              aria-label="Känd komponent"
            >
              <KnownWeightModeSelectControl
                value={knownWeightMode}
                binders={binders}
                onChange={setKnownWeightMode}
              />
            </section>

            <section className={styles.knownWeightArea} aria-label="Känd vikt">
              <input
                className={styles.weightInputControl}
                value={knownWeight}
                inputMode="decimal"
                onChange={(event) => setKnownWeight(event.currentTarget.value)}
              />

              <span className={styles.weightUnitLabel}>kg</span>
            </section>

            <section className={styles.recipeArea} aria-label="Recept">
              <RecipeSelectControl
                value={selectedRecipe}
                onChange={setSelectedRecipe}
              />
            </section>

            <section className={styles.binderRatioArea} aria-label="Bindare">
              <div className={styles.controlRowsGrid}>
                {binders.length === 0 ? (
                  <div className={styles.ratioEmptyState}>Inga bindare</div>
                ) : (
                  <div className={styles.binderControlRowWithSeparators}>
                    {binders.map((item, index) => (
                      <Fragment key={item.id}>
                        {index > 0 && (
                          <span className={styles.binderRatioSeparator} aria-hidden="true">
                            :
                          </span>
                        )}
                        <div className={styles.binderRatioCardSlot}>
                          <ControlBinderCard
                            item={item}
                            canDelete={canDeleteBinder(item, binders)}
                            onValueChange={updateBinderValue}
                            onDelete={deleteBinder}
                          />
                        </div>
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section
              className={styles.binderActionArea}
              aria-label="Lägg till bindare"
            >
              <button
                className={styles.selectActionControl}
                type="button"
                onClick={addBinder}
              >
                + Bindarkomponent
              </button>
            </section>

            <section className={styles.additiveRatioArea} aria-label="Tillägg">
              <div className={styles.controlRowsGrid}>
                {additives.length === 0 ? (
                  <div className={styles.ratioEmptyState}>Inga tillägg</div>
                ) : (
                  <div className={styles.additiveControlRow}>
                    {additives.map((item) => (
                      <div key={item.id} className={styles.additiveRatioCardSlot}>
                        <ControlAdditiveCard
                          item={item}
                          onValueChange={updateAdditiveValue}
                          onDelete={deleteAdditive}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section
              className={styles.additiveActionArea}
              aria-label="Lägg till tillägg"
            >
              <AdditiveSelectControl additives={additives} onChange={addAdditive} />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function CardDeleteButton({
  label,
  disabled = false,
  onClick,
}: Readonly<{
  label: string
  disabled?: boolean
  onClick: () => void
}>) {
  return (
    <button
      type="button"
      className={styles.resultCardDeleteButton}
      disabled={disabled}
      aria-label={`Ta bort ${label}`}
      onClick={onClick}
    >
      <Trash2 className={styles.resultCardDeleteIcon} size={13} strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}

function ControlBinderCard({
  item,
  canDelete,
  onValueChange,
  onDelete,
}: Readonly<{
  item: RatioItem
  canDelete: boolean
  onValueChange: (id: string, value: string) => void
  onDelete: (id: string) => void
}>) {
  return (
    <article className={styles.resultCard}>
      <div className={styles.resultCardHeader}>
        <span className={styles.resultCardHeaderTitle}>{item.label}</span>
        <CardDeleteButton
          label={item.label}
          disabled={!canDelete}
          onClick={() => onDelete(item.id)}
        />
      </div>
      <input
        className={styles.ratioValueInput}
        value={item.value}
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={`${item.label} ${item.unit}`}
        onChange={(event) => {
          const nextValue = event.currentTarget.value.replace(/\D/g, "");
          onValueChange(item.id, nextValue);
        }}
      />
      <span className={styles.resultUnit}>{item.nameUnit}</span>
    </article>
  );
}

function ControlAdditiveCard({
  item,
  onValueChange,
  onDelete,
}: Readonly<{
  item: RatioItem
  onValueChange: (id: string, value: string) => void
  onDelete: (id: string) => void
}>) {
  return (
    <article className={styles.resultCard}>
      <div className={styles.resultCardHeader}>
        <span className={styles.resultCardHeaderTitle}>{item.nameUnit}</span>
        <CardDeleteButton label={item.nameUnit} onClick={() => onDelete(item.id)} />
      </div>
      <input
        className={styles.ratioValueInput}
        value={item.value}
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={`${item.nameUnit} ${item.unit}`}
        onChange={(event) => {
          const nextValue = event.currentTarget.value.replace(/\D/g, '')
          onValueChange(item.id, nextValue)
        }}
      />
      <span className={styles.resultUnit}>{item.unit}</span>
    </article>
  )
}

function ResultCard({ item }: Readonly<{ item: ResultItem }>) {
  return (
    <article className={styles.resultCard}>
      <span className={styles.resultLabel}>{item.label}</span>
      <strong className={styles.resultValue}>{item.value}</strong>
      <span className={styles.resultUnit}>{item.unit}</span>
    </article>
  )
}

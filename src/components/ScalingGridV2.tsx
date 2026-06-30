import { Fragment, useMemo, useState } from 'react'
import { Trash2 } from 'lucide-react'
import * as styles from './ScalingGridV2.css'
import {
  applyRecipePreset,
  calcResultToDisplayItems,
  computeMixResult,
  getModeTitle,
  sanitizeDecimalInput,
  type RecipeId,
} from './scalingGridV2Logic'

type BinderKey = 'A' | 'B' | 'C' | 'D'

type AdditiveKind = 'sand' | 'water' | 'thixotrope' | 'custom'

type RatioUnit = 'delar' | '%'

type WeightUnit = 'kg'

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
  { value: 'custom', label: '✏️ Valfri (Recept)' },
  { value: 'repair-standard', label: '🔒 Standard lagning (Recept)' },
  { value: 'sockel-fas', label: '🔒 Sockel / Fas (Recept)' },
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

function getBinderLabelClass(label: string): string {
  if (label === 'A') return styles.binderLabelA
  if (label === 'B') return styles.binderLabelB
  if (label === 'C') return styles.binderLabelC
  if (label === 'D') return styles.binderLabelD
  return styles.resultCardHeaderTitle
}

function getAdditiveLabelClass(nameUnit: string): string {
  if (nameUnit === 'sand') return styles.additiveLabelSand
  return styles.resultCardHeaderTitle
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
      listHeading="Recept"
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
  disabled = false,
}: Readonly<{
  additives: readonly RatioItem[]
  onChange: (value: AdditiveKind) => void
  disabled?: boolean
}>) {
  const usedKinds = new Set(additives.map((item) => item.nameUnit))
  const availableOptions = additiveOptions.filter((option) => !usedKinds.has(option.value))

  if (availableOptions.length === 0 || disabled) {
    return (
      <button className={styles.selectActionOutlineControl} type="button" disabled>
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
  listHeading,
  options,
  placement,
  onChange,
}: Readonly<{
  id: string
  label: string
  value: Value | null
  placeholder?: string
  listHeading?: string
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
      ? `${styles.appSelectPanel} ${styles.appSelectPanelUp} ${styles.appSelectPanelOpen}`
      : `${styles.appSelectPanel} ${styles.appSelectPanelDown} ${styles.appSelectPanelOpen}`

  return (
    <div
      className={`${styles.appSelectRoot} ${isOpen ? styles.appSelectRootOpen : ''}`}
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
        className={`${styles.appSelectTrigger} ${isOpen ? styles.appSelectTriggerOpen : ''}`}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={styles.appSelectTriggerText}>{displayValue}</span>
        <span
          className={`${styles.appSelectChevron} ${isOpen ? styles.appSelectChevronOpen : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className={panelClassName} role="listbox" aria-label={label}>
          {listHeading && (
            <div className={styles.appSelectPanelHeading} aria-hidden="true">
              {listHeading}
            </div>
          )}
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
          <ResultCard key={item.id} item={item} kind="binder" />
        ))}
      </div>

      {additiveItems.length > 0 && (
        <div className={styles.additiveResultRow}>
          {additiveItems.map((item) => (
            <ResultCard key={item.id} item={item} kind="additive" />
          ))}
        </div>
      )}
    </div>
  )
}

export function ScalingGridV2() {
  const [knownWeightMode, setKnownWeightMode] = useState<KnownWeightMode>('visibleBindersTotal')
  const [knownWeight, setKnownWeight] = useState<string>('15,00')
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeId>('custom')
  const [recipeLocked, setRecipeLocked] = useState<boolean>(false)

  const [binders, setBinders] = useState<readonly RatioItem[]>(initialBinders)
  const [additives, setAdditives] = useState<readonly RatioItem[]>(initialAdditives)

  const result = useMemo(
    () => computeMixResult({ knownWeightMode, knownWeight, binders, additives }),
    [knownWeightMode, knownWeight, binders, additives]
  )

  const {
    binderItems: binderResultItems,
    additiveItems: additiveResultItems,
    totalWeight,
  } = useMemo(() => calcResultToDisplayItems(result), [result])

  function handleRecipeChange(recipeId: RecipeId): void {
    setSelectedRecipe(recipeId)

    const preset = applyRecipePreset(recipeId)
    setRecipeLocked(preset.recipeLocked)
    setBinders(preset.binders as readonly RatioItem[])
    setAdditives(preset.additives as readonly RatioItem[])
  }

  function updateBinderValue(id: string, value: string): void {
    if (recipeLocked) return
    setBinders((items) => items.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  function updateAdditiveValue(id: string, value: string): void {
    if (recipeLocked) return
    setAdditives((items) => items.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  function addBinder(): void {
    if (recipeLocked) return
    setBinders((currentBinders) => {
      const nextBinder = createNextBinder(currentBinders)

      if (!nextBinder) {
        return currentBinders
      }

      return [...currentBinders, nextBinder]
    })
  }

  function deleteBinder(id: string): void {
    if (recipeLocked) return
    setBinders((currentBinders) => {
      const binder = currentBinders.find((item) => item.id === id)

      if (!binder || !canDeleteBinder(binder, currentBinders)) {
        return currentBinders
      }

      return currentBinders.filter((item) => item.id !== id)
    })
  }

  function addAdditive(kind: AdditiveKind): void {
    if (recipeLocked) return
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
    if (recipeLocked) return
    setAdditives((currentAdditives) => currentAdditives.filter((item) => item.id !== id))
  }

  return (
    <main className={styles.pageFrame}>
      <section className={styles.mobileViewport} aria-label="Calculator app">
        <div className={styles.appScrollLayer}>
          <div className={styles.calculatorGrid}>
            <header className={styles.headerArea}>
              <h1 className={styles.appTitle}>{getModeTitle(knownWeightMode)}</h1>
            </header>

            <section
              className={styles.resultsSectionGroup}
              aria-label="Resultat"
              aria-readonly="true"
            >
              <div className={styles.resultsSectionDisclosureSlot}>
                <button className={styles.resultDisclosureControl} type="button">
                  Visa exakt uträkning
                </button>
              </div>

              <div className={styles.resultsSectionRowsSlot}>
                <ResultRowsGrid
                  binderItems={binderResultItems as readonly ResultItem[]}
                  additiveItems={additiveResultItems as readonly ResultItem[]}
                />
              </div>

              <div className={styles.resultsSectionTotalSlot}>
                <article className={styles.resultOutputTotalCard}>
                  <span className={styles.resultOutputLabel}>Totalt</span>
                  <strong className={styles.resultOutputTotalValue}>{totalWeight}</strong>
                  <span className={styles.resultOutputUnit}>kg</span>
                </article>
              </div>
            </section>

            <section className={styles.recipeSectionGroup} aria-label="Recept">
              <div className={styles.recipeSectionSelectSlot}>
                <RecipeSelectControl
                  value={selectedRecipe}
                  onChange={handleRecipeChange}
                />
              </div>
            </section>

            <section className={styles.knownInputGroup} aria-label="Känd mängd">
              <div className={styles.knownInputGroupSelectSlot}>
                <KnownWeightModeSelectControl
                  value={knownWeightMode}
                  binders={binders}
                  onChange={setKnownWeightMode}
                />
              </div>

              <div className={styles.knownInputGroupWeightRow}>
                <input
                  className={styles.weightInputControl}
                  value={knownWeight}
                  inputMode="decimal"
                  aria-label="Känd vikt i kilogram"
                  onChange={(event) =>
                    setKnownWeight(sanitizeDecimalInput(event.currentTarget.value))
                  }
                />

                <span className={styles.weightUnitLabel}>kg</span>
              </div>
            </section>

            <section className={styles.binderSectionGroup} aria-label="Bindare">
              <div className={styles.binderSectionRatioSlot}>
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
                              readOnly={recipeLocked}
                              onValueChange={updateBinderValue}
                              onDelete={deleteBinder}
                            />
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.sectionGroupActionSlot}>
                <button
                  className={styles.selectActionOutlineControl}
                  type="button"
                  onClick={addBinder}
                  disabled={recipeLocked}
                >
                  + Bindarkomponent
                </button>
              </div>
            </section>

            <section className={styles.additiveSectionGroup} aria-label="Tillägg">
              <div className={styles.additiveSectionRatioSlot}>
                <div className={styles.controlRowsGrid}>
                  {additives.length === 0 ? (
                    <div className={styles.ratioEmptyState}>Inga tillägg</div>
                  ) : (
                    <div className={styles.additiveControlRow}>
                      {additives.map((item) => (
                        <div key={item.id} className={styles.additiveRatioCardSlot}>
                          <ControlAdditiveCard
                            item={item}
                            readOnly={recipeLocked}
                            onValueChange={updateAdditiveValue}
                            onDelete={deleteAdditive}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.sectionGroupActionSlot}>
                <AdditiveSelectControl
                  additives={additives}
                  onChange={addAdditive}
                  disabled={recipeLocked}
                />
              </div>
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
  readOnly = false,
  onValueChange,
  onDelete,
}: Readonly<{
  item: RatioItem
  canDelete: boolean
  readOnly?: boolean
  onValueChange: (id: string, value: string) => void
  onDelete: (id: string) => void
}>) {
  return (
    <article className={styles.resultCard}>
      <div className={styles.resultCardHeader}>
        <span className={getBinderLabelClass(item.label)}>{item.label}</span>
        <CardDeleteButton
          label={item.label}
          disabled={!canDelete || readOnly}
          onClick={() => onDelete(item.id)}
        />
      </div>
      <input
        className={styles.ratioValueInput}
        value={item.value}
        inputMode="numeric"
        pattern="[0-9]*"
        disabled={readOnly}
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
  readOnly = false,
  onValueChange,
  onDelete,
}: Readonly<{
  item: RatioItem
  readOnly?: boolean
  onValueChange: (id: string, value: string) => void
  onDelete: (id: string) => void
}>) {
  return (
    <article className={styles.resultCard}>
      <div className={styles.resultCardHeader}>
        <span className={getAdditiveLabelClass(item.nameUnit)}>{item.nameUnit}</span>
        <CardDeleteButton
          label={item.nameUnit}
          disabled={readOnly}
          onClick={() => onDelete(item.id)}
        />
      </div>
      <input
        className={styles.ratioValueInput}
        value={item.value}
        inputMode="numeric"
        pattern="[0-9]*"
        disabled={readOnly}
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

function ResultCard({
  item,
  kind,
}: Readonly<{ item: ResultItem; kind: 'binder' | 'additive' }>) {
  const labelClassName =
    kind === 'binder'
      ? getBinderLabelClass(item.label)
      : getAdditiveLabelClass(item.nameUnit)

  return (
    <article className={styles.resultOutputCard} aria-label={`${item.label} ${item.value} ${item.unit}`}>
      <span className={labelClassName}>{item.label}</span>
      <strong className={styles.resultOutputValue}>{item.value}</strong>
      <span className={styles.resultOutputUnit}>{item.unit}</span>
    </article>
  )
}

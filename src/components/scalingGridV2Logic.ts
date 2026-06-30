import {
  calculateMix,
  formatKg,
  type BinderComponent,
  type CalcMode,
  type CalculationResult,
  type RecipeAdditive,
  type AdditiveType,
} from '../calculations/calculator'
import { loadRecipePreset, type RecipeId } from '../store/calculatorStore'

export type { RecipeId }

export type BinderKey = 'A' | 'B' | 'C' | 'D'

export type AdditiveKind = 'sand' | 'water' | 'thixotrope' | 'custom'

export type NameUnitBinder = 'bas' | 'härdare' | 'filler' | 'custom'

export type KnownWeightMode =
  | 'totalWithAdditives'
  | 'visibleBindersTotal'
  | `component:${BinderKey}`

export type RatioItemLike = Readonly<{
  id: string
  label: string
  value: string
  nameUnit: NameUnitBinder | AdditiveKind
}>

export type RatioBinderPresetItem = Readonly<{
  id: string
  label: string
  value: string
  unit: 'delar'
  nameUnit: NameUnitBinder
  removable: boolean
}>

export type RatioAdditivePresetItem = Readonly<{
  id: string
  label: string
  value: string
  unit: '%'
  nameUnit: AdditiveKind
  removable: boolean
}>

export type ResultItemLike = Readonly<{
  id: string
  label: string
  value: string
  unit: 'kg'
  nameUnit: string
  removable: boolean
}>

const binderNameUnitByKey = {
  A: 'bas',
  B: 'härdare',
  C: 'filler',
  D: 'custom',
} as const satisfies Record<BinderKey, NameUnitBinder>

const binderColorByKey = {
  A: 'blue',
  B: 'green',
  C: 'gray',
  D: 'gray',
} as const satisfies Record<BinderKey, BinderComponent['color']>

export function toNumber(value: string | number): number {
  return Number(String(value).replace(',', '.')) || 0
}

/** Keeps digits and one decimal separator (comma), capped at maxDecimals. */
export function sanitizeDecimalInput(raw: string, maxDecimals = 2): string {
  const normalized = raw.replace('.', ',')
  const cleaned = normalized.replace(/[^\d,]/g, '')
  const commaIndex = cleaned.indexOf(',')

  if (commaIndex === -1) {
    return cleaned
  }

  const intPart = cleaned.slice(0, commaIndex)
  const decPart = cleaned.slice(commaIndex + 1).replace(/,/g, '')

  return `${intPart},${decPart.slice(0, maxDecimals)}`
}

export function getModeTitle(mode: KnownWeightMode): string {
  if (mode === 'totalWithAdditives') return 'Total vikt med tillägg'
  if (mode === 'visibleBindersTotal') return 'Färdig mängd epoxy A+B'
  if (mode === 'component:A') return 'Vikt på komponent A'
  if (mode === 'component:B') return 'Vikt på komponent B'
  if (mode === 'component:C') return 'Vikt på komponent C'
  if (mode === 'component:D') return 'Vikt på komponent D'
  return 'Vikt på komponent'
}

export function knownWeightModeToCalc(
  mode: KnownWeightMode,
  binders: readonly RatioItemLike[]
): { mode: CalcMode; knownComponentId: string } {
  const fallbackId = binders[0]?.label.toLowerCase() ?? 'a'

  if (mode === 'totalWithAdditives') {
    return { mode: 'totalWithAdditives', knownComponentId: fallbackId }
  }

  if (mode === 'visibleBindersTotal') {
    return { mode: 'binder', knownComponentId: fallbackId }
  }

  const binderKey = mode.replace('component:', '') as BinderKey
  return { mode: 'component', knownComponentId: binderKey.toLowerCase() }
}

export function ratioBindersToCalc(binders: readonly RatioItemLike[]): BinderComponent[] {
  return binders.map((binder) => {
    const key = binder.label as BinderKey

    return {
      id: binder.label.toLowerCase(),
      name: binder.label,
      parts: toNumber(binder.value),
      color: binderColorByKey[key] ?? 'gray',
    }
  })
}

export function ratioAdditivesToCalc(additives: readonly RatioItemLike[]): RecipeAdditive[] {
  return additives.map((additive) => ({
    id: additive.id.replace(/^additive-/, ''),
    type: additive.nameUnit as AdditiveType,
    name: additive.label,
    percentOfBinder: toNumber(additive.value),
  }))
}

export function computeMixResult(params: {
  knownWeightMode: KnownWeightMode
  knownWeight: string
  binders: readonly RatioItemLike[]
  additives: readonly RatioItemLike[]
}): CalculationResult | null {
  const { mode, knownComponentId } = knownWeightModeToCalc(params.knownWeightMode, params.binders)

  return calculateMix({
    mode,
    knownWeight: toNumber(params.knownWeight),
    knownComponentId,
    binders: ratioBindersToCalc(params.binders),
    additives: ratioAdditivesToCalc(params.additives),
  })
}

export function calcResultToDisplayItems(result: CalculationResult | null): {
  binderItems: readonly ResultItemLike[]
  additiveItems: readonly ResultItemLike[]
  totalWeight: string
} {
  if (!result) {
    return {
      binderItems: [],
      additiveItems: [],
      totalWeight: '—',
    }
  }

  return {
    binderItems: result.binderItems.map((item) => ({
      id: `result-${item.id}`,
      label: item.name,
      nameUnit: item.name,
      value: formatKg(item.weight),
      unit: 'kg',
      removable: false,
    })),
    additiveItems: result.additiveItems.map((item) => ({
      id: `result-${item.id}`,
      label: item.name,
      nameUnit: item.name,
      value: formatKg(item.weight),
      unit: 'kg',
      removable: false,
    })),
    totalWeight: formatKg(result.totalWeight),
  }
}

export function calcBinderToRatioItem(binder: BinderComponent, index: number): RatioBinderPresetItem {
  const key = binder.name as BinderKey

  return {
    id: `binder-${binder.name.toLowerCase()}`,
    label: binder.name,
    value: String(binder.parts),
    unit: 'delar',
    nameUnit: binderNameUnitByKey[key] ?? 'custom',
    removable: index >= 2,
  }
}

export function calcAdditiveToRatioItem(additive: RecipeAdditive): RatioAdditivePresetItem {
  return {
    id: `additive-${additive.type}`,
    label: additive.name,
    value: String(additive.percentOfBinder),
    unit: '%',
    nameUnit: additive.type,
    removable: false,
  }
}

export function applyRecipePreset(recipeId: RecipeId): {
  recipeLocked: boolean
  binders: readonly RatioBinderPresetItem[]
  additives: readonly RatioAdditivePresetItem[]
} {
  const preset = loadRecipePreset(recipeId)

  return {
    recipeLocked: preset.recipeLocked,
    binders: preset.binders.map(calcBinderToRatioItem),
    additives: preset.additives.map(calcAdditiveToRatioItem),
  }
}

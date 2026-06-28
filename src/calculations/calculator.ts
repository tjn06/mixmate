export type CalcMode = 'totalWithAdditives' | 'binder' | 'component'

export type BinderComponent = {
  id: string
  name: string
  parts: number
  color: 'blue' | 'green' | 'gray'
}

export type AdditiveType = 'sand' | 'water' | 'thixotrope' | 'custom'

export type RecipeAdditive = {
  id: string
  type: AdditiveType
  name: string
  percentOfBinder: number
}

export type ResultItem = {
  id: string
  name: string
  weight: number
  color: 'blue' | 'green' | 'gray'
  kind: 'binder' | 'additive'
  parts?: number
}

export type CalculationResult = {
  binderItems: ResultItem[]
  additiveItems: ResultItem[]
  binderWeight: number
  totalWeight: number
  steps: string[]
  calculatedAt: string
}

export function formatKg(value: number): string {
  return value.toFixed(2).replace('.', ',')
}

export function calculateMix(params: {
  mode: CalcMode
  knownWeight: number
  knownComponentId: string
  binders: BinderComponent[]
  additives: RecipeAdditive[]
}): CalculationResult | null {
  const { mode, knownWeight, knownComponentId, binders, additives } = params

  if (!knownWeight || knownWeight <= 0) return null

  const totalParts = binders.reduce((sum, item) => sum + item.parts, 0)
  if (totalParts <= 0) return null

  const additiveFactor = 1 + additives.reduce((sum, item) => sum + item.percentOfBinder / 100, 0)

  let binderWeight = knownWeight
  let weightPerPart = 0

  if (mode === 'totalWithAdditives') {
    binderWeight = knownWeight / additiveFactor
    weightPerPart = binderWeight / totalParts
  }

  if (mode === 'binder') {
    binderWeight = knownWeight
    weightPerPart = binderWeight / totalParts
  }

  if (mode === 'component') {
    const knownComponent = binders.find((item) => item.id === knownComponentId)
    if (!knownComponent || knownComponent.parts <= 0) return null

    weightPerPart = knownWeight / knownComponent.parts
    binderWeight = weightPerPart * totalParts
  }

  const binderItems: ResultItem[] = binders.map((item) => ({
    id: item.id,
    name: item.name,
    color: item.color,
    kind: 'binder',
    parts: item.parts,
    weight: item.parts * weightPerPart,
  }))

  const additiveItems: ResultItem[] = additives.map((item) => ({
    id: item.id,
    name: item.name,
    color: 'gray',
    kind: 'additive',
    weight: binderWeight * (item.percentOfBinder / 100),
  }))

  const totalWeight = binderWeight + additiveItems.reduce((sum, item) => sum + item.weight, 0)

  return {
    binderItems,
    additiveItems,
    binderWeight,
    totalWeight,
    calculatedAt: new Date().toLocaleTimeString('sv-SE'),
    steps: [
      `Totala bindardelar = ${binders.map((b) => b.parts).join(' + ')} = ${totalParts}`,
      `Bindare = ${formatKg(binderWeight)} kg`,
      `Vikt per del = ${formatKg(weightPerPart)} kg`,
      ...binderItems.map((item) => `${item.name} = ${formatKg(item.weight)} kg`),
      ...additiveItems.map(
        (item, index) =>
          `${item.name} = ${formatKg(binderWeight)} × ${additives[index].percentOfBinder}% = ${formatKg(item.weight)} kg`
      ),
      `Total vikt med tillägg = ${formatKg(totalWeight)} kg`,
    ],
  }
}

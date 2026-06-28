import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  calculateMix,
  type AdditiveType,
  type BinderComponent,
  type CalcMode,
  type CalculationResult,
  type RecipeAdditive,
} from '../calculations/calculator'

type Screen = 'start' | 'calculator'
type RecipeId = 'custom' | 'repair-standard' | 'sockel-fas'

type RecipePreset = {
  id: RecipeId
  name: string
  locked: boolean
  binders: BinderComponent[]
  additives: RecipeAdditive[]
}

type CalculatorStore = {
  screen: Screen
  mode: CalcMode
  rememberLastScreen: boolean

  selectedRecipeId: RecipeId
  recipeLocked: boolean

  knownWeight: string
  knownComponentId: string

  binders: BinderComponent[]
  additives: RecipeAdditive[]

  result: CalculationResult | null
  stickyDismissed: boolean

  startCalculation: (mode: CalcMode) => void
  goToStart: () => void
  toggleRememberLastScreen: () => void

  selectRecipe: (recipeId: RecipeId) => void

  setKnownWeight: (value: string) => void
  setKnownComponentId: (id: string) => void

  setBinderName: (id: string, value: string) => void
  setBinderParts: (id: string, value: string) => void
  addBinder: () => void
  removeBinder: (id: string) => void

  setAdditiveName: (id: string, value: string) => void
  setAdditivePercent: (id: string, value: string) => void
  addAdditive: (type: AdditiveType) => void
  removeAdditive: (id: string) => void

  dismissSticky: () => void
}

function toNumber(value: string | number): number {
  return Number(String(value).replace(',', '.')) || 0
}

function createId() {
  return crypto.randomUUID()
}

const colors: BinderComponent['color'][] = ['blue', 'green', 'gray']

function defaultBinders(): BinderComponent[] {
  return [
    { id: 'a', name: 'A', parts: 2, color: 'blue' },
    { id: 'b', name: 'B', parts: 1, color: 'green' },
  ]
}

function defaultAdditives(): RecipeAdditive[] {
  return [{ id: 'sand', type: 'sand', name: 'Sand', percentOfBinder: 550 }]
}

const RECIPE_PRESETS: RecipePreset[] = [
  {
    id: 'custom',
    name: 'Valfri',
    locked: false,
    binders: defaultBinders(),
    additives: defaultAdditives(),
  },
  {
    id: 'repair-standard',
    name: 'Lagning standard',
    locked: true,
    binders: [
      { id: 'a', name: 'A', parts: 2, color: 'blue' },
      { id: 'b', name: 'B', parts: 1, color: 'green' },
    ],
    additives: [{ id: 'sand', type: 'sand', name: 'Sand', percentOfBinder: 555 }],
  },
  {
    id: 'sockel-fas',
    name: 'Sockel / Fas',
    locked: true,
    binders: [
      { id: 'a', name: 'A', parts: 2, color: 'blue' },
      { id: 'b', name: 'B', parts: 1, color: 'green' },
    ],
    additives: [
      { id: 'sand', type: 'sand', name: 'Sand', percentOfBinder: 445 },
      {
        id: 'thixotrope',
        type: 'thixotrope',
        name: 'Tixotrop',
        percentOfBinder: 5,
      },
    ],
  },
]

function cloneBinders(binders: BinderComponent[]): BinderComponent[] {
  return binders.map((item) => ({ ...item }))
}

function cloneAdditives(additives: RecipeAdditive[]): RecipeAdditive[] {
  return additives.map((item) => ({ ...item }))
}

function getPreset(recipeId: RecipeId) {
  return RECIPE_PRESETS.find((recipe) => recipe.id === recipeId) ?? RECIPE_PRESETS[0]
}

function defaultKnownWeight(mode: CalcMode) {
  if (mode === 'component') return '2,50'
  if (mode === 'totalWithAdditives') return '45,50'
  return '7,00'
}

function createAdditive(type: AdditiveType): RecipeAdditive {
  if (type === 'sand') {
    return { id: createId(), type, name: 'Sand', percentOfBinder: 550 }
  }

  if (type === 'water') {
    return { id: createId(), type, name: 'Vatten', percentOfBinder: 0 }
  }

  if (type === 'thixotrope') {
    return { id: createId(), type, name: 'Tixotrop', percentOfBinder: 5 }
  }

  return { id: createId(), type, name: 'Tillägg', percentOfBinder: 0 }
}

function getResult(state: {
  mode: CalcMode
  knownWeight: string
  knownComponentId: string
  binders: BinderComponent[]
  additives: RecipeAdditive[]
}) {
  return calculateMix({
    mode: state.mode,
    knownWeight: toNumber(state.knownWeight),
    knownComponentId: state.knownComponentId,
    binders: state.binders,
    additives: state.additives,
  })
}

function resetForMode(mode: CalcMode) {
  const preset = getPreset('custom')
  const binders = cloneBinders(preset.binders)
  const additives = cloneAdditives(preset.additives)
  const knownWeight = defaultKnownWeight(mode)
  const knownComponentId = binders[0].id

  return {
    mode,
    selectedRecipeId: preset.id,
    recipeLocked: preset.locked,
    knownWeight,
    knownComponentId,
    binders,
    additives,
    result: getResult({
      mode,
      knownWeight,
      knownComponentId,
      binders,
      additives,
    }),
    stickyDismissed: false,
  }
}

function loadRecipe(state: CalculatorStore, recipeId: RecipeId) {
  const preset = getPreset(recipeId)
  const binders = cloneBinders(preset.binders)
  const additives = cloneAdditives(preset.additives)
  const knownComponentId = binders[0].id

  return {
    selectedRecipeId: preset.id,
    recipeLocked: preset.locked,
    binders,
    additives,
    knownComponentId,
    result: getResult({
      mode: state.mode,
      knownWeight: state.knownWeight,
      knownComponentId,
      binders,
      additives,
    }),
    stickyDismissed: false,
  }
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set) => ({
      screen: 'start',
      mode: 'binder',
      rememberLastScreen: false,

      selectedRecipeId: 'custom',
      recipeLocked: false,

      knownWeight: '7,00',
      knownComponentId: 'a',

      binders: defaultBinders(),
      additives: defaultAdditives(),

      result: null,
      stickyDismissed: false,

      startCalculation: (mode) =>
        set({
          screen: 'calculator',
          ...resetForMode(mode),
        }),

      goToStart: () =>
        set({
          screen: 'start',
          ...resetForMode('binder'),
        }),

      toggleRememberLastScreen: () =>
        set((state) => ({
          rememberLastScreen: !state.rememberLastScreen,
        })),

      selectRecipe: (recipeId) => set((state) => loadRecipe(state, recipeId)),

      setKnownWeight: (value) =>
        set((state) => {
          const nextState = { ...state, knownWeight: value }

          return {
            knownWeight: value,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      setKnownComponentId: (id) =>
        set((state) => {
          const nextState = { ...state, knownComponentId: id }

          return {
            knownComponentId: id,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      setBinderName: (binderId, value) =>
        set((state) => {
          if (state.recipeLocked) return state

          const binders = state.binders.map((item) =>
            item.id === binderId ? { ...item, name: value } : item
          )

          const nextState = { ...state, binders }

          return {
            binders,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      setBinderParts: (binderId, value) =>
        set((state) => {
          if (state.recipeLocked) return state

          const binders = state.binders.map((item) =>
            item.id === binderId ? { ...item, parts: toNumber(value) } : item
          )

          const nextState = { ...state, binders }

          return {
            binders,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      addBinder: () =>
        set((state) => {
          if (state.recipeLocked) return state

          const index = state.binders.length
          const binders = [
            ...state.binders,
            {
              id: createId(),
              name: String.fromCharCode(65 + index),
              parts: 1,
              color: colors[index % colors.length],
            },
          ]

          const nextState = { ...state, binders }

          return {
            binders,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      removeBinder: (binderId) =>
        set((state) => {
          if (state.recipeLocked || state.binders.length <= 2) return state

          const binders = state.binders.filter((item) => item.id !== binderId)
          const knownStillExists = binders.some((item) => item.id === state.knownComponentId)
          const knownComponentId = knownStillExists ? state.knownComponentId : binders[0].id

          const nextState = { ...state, binders, knownComponentId }

          return {
            binders,
            knownComponentId,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      setAdditiveName: (additiveId, value) =>
        set((state) => {
          if (state.recipeLocked) return state

          const additives = state.additives.map((item) =>
            item.id === additiveId ? { ...item, name: value } : item
          )

          const nextState = { ...state, additives }

          return {
            additives,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      setAdditivePercent: (additiveId, value) =>
        set((state) => {
          if (state.recipeLocked) return state

          const additives = state.additives.map((item) =>
            item.id === additiveId ? { ...item, percentOfBinder: toNumber(value) } : item
          )

          const nextState = { ...state, additives }

          return {
            additives,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      addAdditive: (type) =>
        set((state) => {
          if (state.recipeLocked) return state

          const additives = [...state.additives, createAdditive(type)]
          const nextState = { ...state, additives }

          return {
            additives,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      removeAdditive: (additiveId) =>
        set((state) => {
          if (state.recipeLocked) return state

          const additives = state.additives.filter((item) => item.id !== additiveId)

          const nextState = { ...state, additives }

          return {
            additives,
            result: getResult(nextState),
            stickyDismissed: false,
          }
        }),

      dismissSticky: () => set({ stickyDismissed: true }),
    }),
    {
      name: 'epoxy-calc-navigation-v1',
      partialize: (state) => ({
        screen: state.rememberLastScreen ? state.screen : 'start',
        mode: state.mode,
        rememberLastScreen: state.rememberLastScreen,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return

        const reset = resetForMode(state.mode)
        state.selectedRecipeId = reset.selectedRecipeId
        state.recipeLocked = reset.recipeLocked
        state.knownWeight = reset.knownWeight
        state.knownComponentId = reset.knownComponentId
        state.binders = reset.binders
        state.additives = reset.additives
        state.result = reset.result
        state.stickyDismissed = false
      },
    }
  )
)

export type ComponentInput = {
    id: string
    name: string
    parts: number
  }
  
  export type AdditiveInput = {
    id: string
    name: string
    percentOfBinder: number
  }
  
  export type CalculationResult = {
    components: {
      id: string
      name: string
      parts: number
      weight: number
    }[]
    additives: {
      id: string
      name: string
      percentOfBinder: number
      weight: number
    }[]
    binderWeight: number
    totalWeight: number
    explanation: string[]
    createdAt: string
  }
import './App.css'
import { CalculatorScreen } from './components/CalculatorScreen.tsx'
import { StartScreen } from './components/StartScreen.tsx'
import { useCalculatorStore } from './store/calculatorStore'
import { ScalingGrid } from './components/ScalingGrid.tsx'
import { ScalingGridV2 } from './components/ScalingGridV2.tsx'

function App() {
  const screen = useCalculatorStore((state) => state.screen)
  //return screen === 'start' ? <ScalingGridV2 /> : <StartScreen />
  return screen === 'start' ? <ScalingGridV2 /> : <CalculatorScreen />

  return screen === 'start' ? <StartScreen /> : <ScalingGrid />
  return screen === 'start' ? <StartScreen /> : <CalculatorScreen />
}

export default App

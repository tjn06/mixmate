import "./App.css"
import { CalculatorScreen } from "./components/CalculatorScreen.tsx"
import { StartScreen } from "./components/StartScreen.tsx"
import { useCalculatorStore } from "./store/calculatorStore"

function App() {
  const screen = useCalculatorStore((state) => state.screen)

  return screen === "start" ? <StartScreen /> : <CalculatorScreen />
}

export default App
import { useRef } from "react"
import "./App.css"
import Toolbar from "./components/Toolbar"

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  return (
    <main>
      <Toolbar />
      <canvas
        id="whiteboard"
        ref={canvasRef}
        className="h-[80vh] w-[8-vh] border border-1 border-gray-400 mx-auto rounded-xl"
      />
    </main>
  )
}

export default App

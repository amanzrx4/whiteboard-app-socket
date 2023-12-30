import React, { useEffect, useRef } from "react"
import "./App.css"
import Toolbar from "./components/Toolbar"
import rough from "roughjs"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import {
  DrawableElementCommon,
  addElements,
  updateElements,
} from "./redux/slices/whiteboard"
import { createDrawableElement } from "./utils/createElement"

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentDrawableElementRef = useRef<DrawableElementCommon | null>(null)

  const tool = useAppSelector((s) => s.tool)
  const elements = useAppSelector((s) => s.elements)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvasBoundingClientRect = canvasRef.current.getBoundingClientRect()
    const rc = rough.canvas(canvasRef.current)
    // clear previous rectangles

    const ctx = canvasRef.current.getContext("2d")
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    elements.forEach((el) => {
      rc.rectangle(
        el.x1 - canvasBoundingClientRect.left,
        el.y1 - canvasBoundingClientRect.top,
        el.x2 - el.x1,
        el.y2 - el.y1,
      )
    })
  }, [elements, canvasRef])

  //  fired when initially pressed
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !tool) return
    const element = createDrawableElement(
      e.clientX,
      e.clientY,
      e.clientX,
      e.clientY,
    )

    currentDrawableElementRef.current = element
    dispatch(addElements(element))

    // console.log("mouse down", e.clientX, e.clientY)
    // if (!canvasRef.current || !tool) return
    // const rc = rough.canvas(canvasRef.current)
    // const canvasBoundingClientRect = canvasRef.current.getBoundingClientRect()
    // rc.rectangle(
    //   e.clientX - canvasBoundingClientRect.left,
    //   e.clientY - canvasBoundingClientRect.top,
    //   500,
    //   600,
    // )
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentDrawableElementRef.current) return
    dispatch(
      updateElements({
        id: currentDrawableElementRef.current.id,
        x2: e.clientX,
        y2: e.clientY,
      }),
    )
  }
  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    currentDrawableElementRef.current = null
  }

  return (
    <main>
      <Toolbar />
      <canvas
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        // onDragEnter={() => console.log("dragging start")}
        // onDragLeave={() => console.log("dragging left")}
        // onMouseOver={}
        width={window.innerWidth}
        height={window.innerHeight}
        id="whiteboard"
        ref={canvasRef}
        className=" border border-1 border-gray-400 mx-auto rounded-xl m-4"
      />
    </main>
  )
}

export default App

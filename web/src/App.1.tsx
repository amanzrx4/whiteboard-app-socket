import React, { useRef } from "react"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import {
  DrawableElementCommon,
  addElements,
  updateElements,
} from "./redux/slices/whiteboard"
import { createDrawableElement } from "./utils/createElement"

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentDrawableElementRef = useRef<DrawableElementCommon | null>(null)

  const tool = useAppSelector((s) => s.tool)
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (canvasRef.current !== null) {
  //     const rc = rough.canvas(canvasRef.current)
  //     // rc.rectangle(1, 2, 500, 600)
  //   }
  // }, [canvasRef])
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
  // const newDrawableElement: DrawableElementCommon ={
  //   id: currentDrawableElementRef.current,
  //   x1: currentDrawableElementRef.x1,
  // }
}

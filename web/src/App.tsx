import React, { useEffect, useRef } from "react"
import rough from "roughjs"
import { SocketEventServer } from "../../server/src/utils/socket"
import "./App.css"
import Toolbar from "./components/Toolbar"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import {
  DrawableElementCommon,
  addElements,
  addSynchedElements,
  updateElements,
} from "./redux/slices/whiteboard"
import { createDrawableElement } from "./utils/createElement"
import { socket } from "./utils/socket"
function App() {
  // const socket = connectToSocket()
  // useEffect(() => {
  //   if (!socketInstance) return
  //   const unsubscribe = store.subscribe(() => {
  //     console.log("store updated")
  //     // socket.emit("update", store.getState().elements)
  //   })

  //   return () => unsubscribe()
  // }, [socketInstance, socket])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentDrawableElementRef = useRef<DrawableElementCommon | null>(null)

  const tool = useAppSelector((s) => s.tool)
  const elements = useAppSelector((s) => s.elements)
  const synchedElements = useAppSelector((s) => s.synchedElements)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvasBoundingClientRect = canvasRef.current.getBoundingClientRect()
    const rc = rough.canvas(canvasRef.current)
    // clear previous rectangles
    const ctx = canvasRef.current.getContext("2d")
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    elements.forEach((el) => {
      switch (el.tool) {
        case "rectangle":
          rc.rectangle(
            el.x1 - canvasBoundingClientRect.left,
            el.y1 - canvasBoundingClientRect.top,
            el.x2 - el.x1,
            el.y2 - el.y1,
          )
          break
        case "line":
          rc.line(
            el.x1 - canvasBoundingClientRect.left,
            el.y1 - canvasBoundingClientRect.top,
            el.x2 - canvasBoundingClientRect.left,
            el.y2 - canvasBoundingClientRect.top,
          )
      }
    })
    synchedElements.forEach((el) => {
      switch (el.tool) {
        case "rectangle":
          rc.rectangle(
            el.x1 - canvasBoundingClientRect.left,
            el.y1 - canvasBoundingClientRect.top,
            el.x2 - el.x1,
            el.y2 - el.y1,
            {
              stroke: "red",
            },
          )
          break
        case "line":
          rc.line(
            el.x1 - canvasBoundingClientRect.left,
            el.y1 - canvasBoundingClientRect.top,
            el.x2 - canvasBoundingClientRect.left,
            el.y2 - canvasBoundingClientRect.top,
            {
              stroke: "red",
            },
          )
      }
    })
  }, [elements, canvasRef, synchedElements])

  useEffect(() => {
    socket.on(SocketEventServer.ELEMENTS_STORE_STATE_BROADCAST, (data) => {
      data = data as DrawableElementCommon[]

      dispatch(addSynchedElements(data))
    })
  }, [dispatch])

  //  fired when initially pressed
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    // if (!tool) {
    //   // check if the cursor is around any drawed element
    //   const canvasBoundingClientRect = canvasRef.current.getBoundingClientRect()
    //   const x = e.clientX - canvasBoundingClientRect.left
    //   const y = e.clientY - canvasBoundingClientRect.top
    //   const foundElement = elements.find((el) => {
    //     return x >= el.x1 && x <= el.x2 && y >= el.y1 && y <= el.y2
    //   })
    //   console.log(foundElement)
    //   if (foundElement) {
    //     currentDrawableElementRef.current = foundElement
    //   }
    // }

    if (!tool) return
    const element = createDrawableElement(
      e.clientX,
      e.clientY,
      e.clientX,
      e.clientY,
      tool,
    )

    currentDrawableElementRef.current = element
    dispatch(addElements(element))
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentDrawableElementRef.current) return
    // if (!tool) {
    //   console.log("dragging")
    //   return dispatch(
    //     updateElements({
    //       id: currentDrawableElementRef.current.id,
    //       x1: e.clientX,
    //       y1: e.clientY,
    //     }),
    //   )
    // }
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

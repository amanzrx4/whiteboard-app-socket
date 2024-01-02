import { RoughCanvas } from "roughjs/bin/canvas"
import { Tool } from "."
import { DrawableElementCommon } from "../redux/slices/types"

export const drawElement = (
  canvas: RoughCanvas,
  tool: Tool,
  element: DrawableElementCommon,
) => {
  switch (tool) {
    case "line":
      return canvas.line(element.x1, element.y1, element.x2, element.y2)
    case "rectangle":
  }
}

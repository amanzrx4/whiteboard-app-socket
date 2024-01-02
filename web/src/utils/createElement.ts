import { Tool } from "."
import { DrawableElementCommon } from "../redux/slices/whiteboard"
import { v4 as uuidv4 } from "uuid"

type CreateElementArgs = [
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tool: Tool,
]

export const createDrawableElement = (
  ...args: CreateElementArgs
): DrawableElementCommon => {
  const [x1, y1, x2, y2, tool] = args
  const id = uuidv4()
  const element: DrawableElementCommon = {
    id: id,
    x1,
    y1,
    x2,
    y2,
    tool,
  }
  return element
}

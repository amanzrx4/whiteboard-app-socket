export const TOOLS = ["pen", "eraser", "rectangle", "circle", "line"] as const
export type Tool = (typeof TOOLS)[number]

// expot enum Tool {
//   Pen = "pen",
//   Eraser = "eraser",
//   Rectangle = "rectangle",
//   Circle = "circle",
//   Line = "line",
// }

export const TOOLS = ["pen", "eraser", "rectangle", "circle", "line"] as const
export type Tool = (typeof TOOLS)[number]

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Tool } from "../../utils"

export type DrawableElementCommon = {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
}

type WhiteboardSlice = {
  tool: Tool | null
  elements: DrawableElementCommon[]
}

const initialState: WhiteboardSlice = {
  tool: null,
  elements: [],
}

const whiteboardSlice = createSlice({
  name: "whiteboardSlice",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload
    },
    updateElements: (
      state,
      action: PayloadAction<Partial<DrawableElementCommon>>,
    ) => {
      state.elements = state.elements.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
    },
    addElements: (state, action: PayloadAction<DrawableElementCommon>) => {
      if (state.elements.find((el) => el.id === action.payload.id)) return
      state.elements = [...state.elements, action.payload]
    },
  },
})

export const { setTool, addElements, updateElements } = whiteboardSlice.actions
export default whiteboardSlice.reducer

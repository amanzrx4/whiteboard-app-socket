import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Tool } from "../../utils"

export type DrawableElementCommon = {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  tool: Tool
}

type WhiteboardSlice = {
  tool: Tool | null
  elements: DrawableElementCommon[]
  synchedElements: DrawableElementCommon[]
}

const initialState: WhiteboardSlice = {
  tool: null,
  elements: [],
  synchedElements: [],
}

export type Nullable<T> = T | null

const whiteboardSlice = createSlice({
  name: "whiteboardSlice",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Nullable<Tool>>) => {
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
    addSynchedElements: (
      state,
      action: PayloadAction<DrawableElementCommon[]>,
    ) => {
      state.synchedElements = action.payload
    },
  },
})

export const { setTool, addElements, updateElements, addSynchedElements } =
  whiteboardSlice.actions
export default whiteboardSlice.reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Tool } from "../../lib/constants"

type WhiteboardSlice = {
  tool: Tool | null
}

const initialState: WhiteboardSlice = {
  tool: null,
}

const whiteboardSlice = createSlice({
  name: "whiteboardSlice",
  initialState: initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload
    },
  },
})

export const { setTool } = whiteboardSlice.actions
export default whiteboardSlice.reducer

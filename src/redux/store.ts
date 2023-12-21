import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import whiteboardReducer from "./slices/whiteboard"
export const store = configureStore({
  reducer: whiteboardReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

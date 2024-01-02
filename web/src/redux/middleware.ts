import { Middleware } from "@reduxjs/toolkit"
import { socket } from "../utils/socket"
import { SocketEventClient } from "../utils/socket/types"
import { RootState } from "./store"
// const socket = connectToSocket()
export const socketIoMiddleware: Middleware = (store) => (next) => (action) => {
  // Call the next middleware in the chain
  const { elements } = store.getState() as RootState
  const result = next(action)
  // Emit a Socket.IO event whenever the state changes
  // socket.emit("stateChange", store.getState())
  if (
    action.type.includes("addElements") ||
    action.type.includes("updateElements")
  ) {
    socket.emit(SocketEventClient.ELEMENTS_STORE_STATE, elements)
    console.log("emitting ...")
    // socketInstance.emit("update", elements)
  }

  return result
}

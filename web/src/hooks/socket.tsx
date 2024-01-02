import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

export const socketInstance = io(import.meta.env.VITE_BACKEND_URL).connect()

socketInstance.on("connect", () => {
  console.log("connected")
})
const useSocket = (serverUrl: string) => {
  const socket = socketInstance
  // Function to emit events to the server
  const emit = (event: string, data?: unknown) => {
    if (socket) {
      socket.emit(event, data)
    } else {
      console.error("Socket not connected")
    }
  }

  // Function to handle incoming events from the server
  const on = (event: string, callback: (data?: unknown) => void) => {
    if (socket) {
      socket.on(event, callback)
    } else {
      console.error("Socket not connected")
    }
  }

  return { emit, on, socket }
}

export default useSocket

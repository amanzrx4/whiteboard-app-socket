import { createServer } from "http";
import app from "./app";
import { Server } from "socket.io";
import cors from "cors";
import { SocketEventServer, SocketEventServerCommon } from "./utils/socket";

import { DrawableElementCommon } from "../../web/src/redux/slices/types";

export enum SocketEventClient {
  ELEMENTS_STORE_STATE = "elements_store_state",
}

app.use(cors());
const elements: unknown[] = [];
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on(SocketEventServerCommon.CONNECTION, (socket) => {
  console.log("connected");
  socket.on(SocketEventClient.ELEMENTS_STORE_STATE, (data) => {
    data = data as DrawableElementCommon[];
    console.log("broadcasting broadcast ...");
    socket.broadcast.emit(
      SocketEventServer.ELEMENTS_STORE_STATE_BROADCAST,
      data
    );
  });
});

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

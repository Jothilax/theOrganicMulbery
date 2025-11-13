// socket.js
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("joinOrderRoom", (orderId) => {
      socket.join(orderId);
      console.log(`Socket ${socket.id} joined room ${orderId}`);
    });
  });
};

export const emitTrackingUpdate = (orderId, data) => {
  if (io) {
    io.to(orderId).emit("trackingUpdate", data);
  }
};

// ✅ Add this line — so other files can import { io }
export { io };

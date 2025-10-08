import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("✅ New user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("📩 Message received:", msg);
    io.emit("message", msg); // <-- important: broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("✅ Socket.io Server Running..."));

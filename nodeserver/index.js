// Node Server which wil Handle Socet IO connections
import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const app = new express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

app.use(cors());
const user = {};

try {
  server.listen(PORT, () => {
    console.log("Server connected to PORT");
  });
} catch (e) {
  console.log(e);
}

io.on("connection", (socket) => {
  socket.on("new-user-joined ", (name) => {
    user[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    console.log("New User Joined Is " + name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recive", {
      message: message,
      name: user[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("left",user[socket.id]);
    delete user[socket.id];
  });
});

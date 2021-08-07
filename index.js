const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send({ response: "Server is up and running" });
});

io.on("connection", (socket) => {
  socket.on("emergency", ({ senderId, date }) => {
    console.log("sender", senderId);
    io.emit("emergency", { senderId, date });
  });

  socket.on("ping", () => {
    console.log("pinged");
  });
  socket.on("disconnect", () => {});
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

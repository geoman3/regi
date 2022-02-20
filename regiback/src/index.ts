import { Server, Socket } from "socket.io";

const io = new Server({
  /* options */
  
});

io.on("connection", (socket) => {
  console.log("a user has connected")
  socket.emit("now", {
    message: "you have connected"
  })
});

io.on("request-game-create", (socket) => {

})

io.on("request-game-join", (socket) => {

})

let port_num = Number(process.env.PORT_NUM) || 3000

io.listen(port_num);
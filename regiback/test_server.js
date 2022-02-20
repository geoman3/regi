const Server = require("socket.io")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const io = new Server.Server({
  /* options */
  
});
console.log("initialised!");

io.on("connection", (socket) => {
  console.log("a user has connected")
    socket.emit("now", {
        message: "you have connected",
        socketId: socket.id
    })
    socket.join("room 1")
    socket.leave("room 1")
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`)
})

io.of("/").adapter.on("delete-room", (room) => {
  console.log(`room ${room} was deleted`)
})

let port_num = Number(process.env.PORT_NUM) || 3000

io.listen(port_num);
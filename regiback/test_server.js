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
        message: "you have connected"
    })
});

let port_num = Number(process.env.PORT_NUM) || 3000

io.listen(port_num);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
/* options */
});
io.on("connection", (socket) => {
    console.log("a user has connected");
    socket.emit("now", {
        message: "you have connected"
    });
});
io.on("request-game-create", (socket) => {
});
io.on("request-game-join", (socket) => {
});
let port_num = Number(process.env.PORT_NUM) || 3000;
io.listen(port_num);

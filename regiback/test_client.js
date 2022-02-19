// import { io } from "socket.io-client";
const io = require("socket.io-client")

const socket = io.io("http://localhost:3000")

socket.on("connect", (arg) => {
    console.log(socket.id)
})

socket.on("now", (arg) => {
    console.log(arg)
})

socket.on("disconnect", () => {
    console.log("you have lost connection to the server")
})
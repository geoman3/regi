"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
const game_state_1 = require("./game-state");
const io = new socket_io_1.Server({
/* options */
});
let games = [];
io.on("connection", (socket) => {
    console.log("a user has connected");
    socket.emit("now", {
        message: "you have connected"
    });
});
io.on("request-game-create", (socket) => {
    let gameId = (0, uuid_1.v4)();
    let newGame = new game_state_1.CardGame(gameId);
    newGame.addPlayer(socket.id);
    socket.join(gameId);
    games.push(newGame);
    socket.emit("successful-game-create", { gameId: gameId });
});
io.on("request-game-join", (socket) => {
});
io.on("request-game-leave", (socket) => {
});
// Here we just make sure our rooms and cardgames state agree with each other
io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});
// If there are no sockets in a room, it is deleted so we then delete the corresponding card game
io.of("/").adapter.on("delete-room", (room) => {
    console.log(`room ${room} was deleted`);
    games = games.filter(game => game.gameId != room);
});
let port_num = Number(process.env.PORT_NUM) || 3000;
io.listen(port_num);

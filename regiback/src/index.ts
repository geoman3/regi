import { Server, Socket } from "socket.io";
import {v4 as uuidv4 } from "uuid"

import { CardGame } from "./game-models/Game";


const io = new Server({
  /* options */
});

let games: CardGame[] = []

io.on("connection", (socket: Socket) => {
  console.log("a user has connected")
  socket.emit("now", {
    message: "you have connected"
  })
});

io.on("request-game-create", (socket: Socket) => {
  let gameId = uuidv4()
  let newGame = new CardGame(gameId)

  newGame.addPlayer(socket.id)
  socket.join(gameId)
  games.push(newGame)

  socket.emit("successful-game-create", { gameId: gameId })
})

io.on("request-game-join", (socket: Socket) => {
  
})

io.on("request-game-leave", (socket: Socket) => {

})

// Here we just make sure our rooms and cardgames state agree with each other
io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`)
})
// If there are no sockets in a room, it is deleted so we then delete the corresponding card game
io.of("/").adapter.on("delete-room", (room) => {
  console.log(`room ${room} was deleted`)
  games = games.filter(game => game.gameId != room)
})

let port_num = Number(process.env.PORT_NUM) || 3000

io.listen(port_num);
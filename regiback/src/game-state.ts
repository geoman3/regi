
class CardGame {
  gameId: string
  players: string[]

  constructor (socketRoomId: string) {
    this.gameId = socketRoomId
    this.players = []
  }

  addPlayer(playerId: string) {
    this.players.push(playerId)
  }

}

export { CardGame }
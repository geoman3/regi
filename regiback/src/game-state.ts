


/**
 * Class for containing game state
 */
class CardGame {
  gameId: string
  players: Player[]

  constructor (socketRoomId: string) {
    this.gameId = socketRoomId
    this.players = []
  }

  addNewPlayer(playerId: string) {
    this.players.push(new Player(playerId))
  }

}

/**
 * This is a bit overkill, but might be useful in the future
**/
class Player {
  playerId: string

  constructor (playerId: string) {
    this.playerId = playerId
  }
}

export { CardGame }
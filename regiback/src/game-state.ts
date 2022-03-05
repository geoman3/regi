
/**
 * Class for containing game state
 */
class CardGame {
  gameId: string // socket id from socket io
  players: Player[] // array of Players currently in game
  playerTurn: number // refers to who's turn it is
  deck: Card[]

  constructor (socketRoomId: string) {
    this.gameId = socketRoomId
    this.players = []
    this.deck = []
    this.playerTurn = 0
  }

  addPlayer(playerId: string) {
    if (this.players.length < 4) {
      this.players.push(new Player(playerId))
      console.log(`New player for game: ${this.gameId}, player id: ${playerId}, num players: ${this.players.length}`)
      return true
    } else {
      console.log(`4 or more players already in game: ${this.gameId}`)
      return false
    }
  }

  removePlayer(playerId: string) {
    this.players = this.players.filter((player) => {
      player.playerId != playerId
    })
  }

  /**
   * sets / resets the state of the game to a new game
   */
  initGame() {
    // Check that enough players are present
    if (this.players.length != 4) { return false }
    for (var suit of ["spades", "hearts", "clubs", "diamonds"]) {

    }
  }
}

/**
 * This is a bit overkill, but might be useful in the future
**/
class Player {
  playerId: string
  cards: Card[]

  constructor (playerId: string) {
    this.playerId = playerId
    this.cards = []
  }
}

export type CardValue = "4" | "5" | "6" | "7" | "8" | "9" | "10" | "jack" | "queen" | "king" | "joker"
export type Suit = "spades" | "hearts" | "clubs" | "diamonds"
export type Colour = "red" | "black"

class Card {
  suit: Suit
  colour: Colour
  value: string

  constructor(suit: Suit, value: string) {
    this.suit = suit
    this.value = value

    let colourMap : Record<Suit, Colour> = {
      "spades": "black",
      "hearts": "red",
      "diamonds": "red",
      "clubs": "black"
    }
    this.colour = colourMap[suit]
  }
}

export { CardGame }
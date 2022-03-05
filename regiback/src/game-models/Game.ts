import { Card, Suit, FaceValue } from "./Card"
import { Player } from "./Player"

/**
 * Class for containing game state
 * test
 */
export class CardGame {
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
    this.deck =[]
    Object.values(Suit).forEach(suit => { 
      for (let faceValue in Object.values(FaceValue)) {
        console.log(`suit: ${suit}, face: ${faceValue}`)
        this.deck.push(new Card(suit, faceValue))
      }
    })
    // remove cards to get 43 card deck for standard game of 500
    this.deck = this.deck.filter(card => {
      
    })
  }
}
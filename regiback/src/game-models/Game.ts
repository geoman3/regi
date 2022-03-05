import { Card, Suit, FaceValue, Colour } from "./Card"
import { Player } from "./Player"


/**
 * Class for containing game state
 * test
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
  initRound() {
    // Check that enough players are present
    if (this.players.length != 4) { return false }
    let newDeck: Card[] =[]
    Object.values(Suit).forEach((suit) => {
      Object.values(FaceValue).forEach((faceValue) => {
        // This horrible nonsense is to get around a ts compile error where .forEach assigning type: { Suit | string } to suit
        // let me know if theres a better way to do this
        let anySuit: Suit = suit as any as Suit
        let anyFaceValue: FaceValue = faceValue as any as FaceValue
        newDeck.push(new Card(anySuit, anyFaceValue))
      })
    })
    // remove cards to get 43 card deck for standard game of 500
    // remove 2's, 3's, black 4's, keep 1 joker
    newDeck = newDeck.filter(card => {
      (card.faceValue in [ FaceValue.two, FaceValue.three ] === false) &&
      ((card.faceValue === FaceValue.four && card.colour === Colour.black) === false) &&
      (card.faceValue === FaceValue.joker && card.suit != Suit.hearts) === false
    })
    // shuffle - fisher yates alg
    for (let i = newDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let temp = newDeck[i]; newDeck[i] = newDeck[j]; newDeck[j] = temp 
    }
    // Deal
    this.players.forEach((player, idx) => {
      player.hand = newDeck.slice(idx * 10, (idx+1) * 10)
    })
    this.deck = newDeck.slice(-3)
    return true
  }
}

export { CardGame }
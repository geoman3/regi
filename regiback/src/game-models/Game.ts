import { Card, Suit, FaceValue, Colour } from "./Card"
import { Player } from "./Player"


/*
* Base card game class for other card games to inherit from
*/
class CardGame {
  gameId: string // socket id from socket io
  players: Player[] // array of Players currently in game
  activePlayer: Player | null
  deck: Card[]

  maxPlayers = 0

  constructor (socketRoomId: string) {
    this.gameId = socketRoomId
    this.players = []
    this.deck = []
    this.activePlayer = null
  }

  addPlayer(playerId: string) {
    if (this.players.length < this.maxPlayers) {
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

  genNewDeck() {
    let newDeck: Card[] =[]
    // generate a card for each suit / facevalue
    Object.values(Suit).forEach((suit) => {
      Object.values(FaceValue).forEach((faceValue) => {
        // This horrible nonsense is to get around a ts compile error where .forEach assigning type: { Suit | string } to suit
        // let me know if theres a better way to do this
        let anySuit: Suit = suit as any as Suit; let anyFaceValue: FaceValue = faceValue as any as FaceValue
        newDeck.push(new Card(anySuit, anyFaceValue))
      })
    })
    // Keep 1 black and 1 red joker
    newDeck = newDeck.filter(card => {
      (card.faceValue === FaceValue.joker && (card.suit in [Suit.hearts, Suit.spades])) === false
    })
    // shuffle - fisher yates alg
    for (let i = newDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let temp = newDeck[i]; newDeck[i] = newDeck[j]; newDeck[j] = temp 
    }
    
    return newDeck
  }
}

export { CardGame }
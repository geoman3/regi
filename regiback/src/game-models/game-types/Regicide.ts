import { CardGame } from "../Game";
import { Card, FaceValue } from "../Card";

// https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf

export default class Regicide extends CardGame {
  playerCountConfig = [
    { maxHandSize: 8 },
    { maxHandSize: 7 },
    { maxHandSize: 6 },
    { maxHandSize: 5 },
  ]

  discardDeck: Card[]
  regiDeck: Card[]
  currentRegi: Card | null
  
  constructor(socketRoomId: string) {
    super(socketRoomId)
    this.maxPlayers = 4
    this.discardDeck = []
    this.regiDeck = []
    this.currentRegi = null
  }

  newGame() {
    let newDeck = this.genNewDeck()
    this.regiDeck.concat(this.shuffle(newDeck.filter(card => { card.faceValue == FaceValue.king })))
    this.regiDeck.concat(this.shuffle(newDeck.filter(card => { card.faceValue == FaceValue.queen })))
    this.regiDeck.concat(this.shuffle(newDeck.filter(card => { card.faceValue == FaceValue.jack })))
    newDeck = newDeck.filter(card => {
      [FaceValue.king, FaceValue.queen, FaceValue.jack, FaceValue.joker].includes(card.faceValue)
    })
    // Deal
    let maxHandSize = this.playerCountConfig[this.players.length - 1].maxHandSize
    this.players.forEach((player, idx) => {
      player.hand = newDeck.slice(idx * maxHandSize, (idx+1) * maxHandSize)
    })
  }
}
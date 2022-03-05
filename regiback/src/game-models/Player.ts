import { Card } from "./Card"

export class Player {
  playerId: string
  hand: Card[]

  constructor(playerId: string) {
    this.playerId = playerId
    this.hand = []
  }
}
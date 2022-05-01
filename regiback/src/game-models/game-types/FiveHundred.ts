import { CardGame } from "../Game";
import { Card, Suit, FaceValue, Colour } from "../Card"
import { Player } from "../Player"

/**
 * Class for containing game logic + state
 * Rules taken from here: https://gathertogethergames.com/500
 */
class FiveHundred extends CardGame {
  currentBid: number | null
  trumpSuit: Suit | null
  phase: "bidding" | "tricking" | null
  bidWinner: Player | null

  constructor(socketRoomId: string) {
    super(socketRoomId)
    this.phase = null
    this.currentBid = null
    this.trumpSuit = null
    this.bidWinner = null
    this.maxPlayers = 4
  }

  /**
   * sets / resets the state of the game to a new round
   */
  initRound() {
    // Check that enough players are present
    if (this.players.length != 4) { return false }
    this.phase = "bidding"
    let newDeck = this.genNewDeck()
    // remove cards to get 43 card deck for standard game of 500
    // remove 2's, 3's, black 4's, and 1 joker
    newDeck = newDeck.filter(card => {
      (card.faceValue in [ FaceValue.two, FaceValue.three ] === false) &&
      ((card.faceValue === FaceValue.four && card.colour === Colour.black) === false)
    })
    // Deal
    this.players.forEach((player, idx) => {
      player.hand = newDeck.slice(idx * 10, (idx+1) * 10)
    })
    this.deck = newDeck.slice(-3)
    // Set first player as active player
    this.activePlayer = this.players[0]
    return true
  }

  placeBid(playerId: string, size: number | null, suit: Suit | null) {
    if (size === null) { return }
    
  }

  playTrick(playerId: string, card: Card) {

  }

  resolveTrick() {

  }

  scoreRound() {

  }
}

export { FiveHundred }
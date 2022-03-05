enum FaceValue {
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  jack,
  queen,
  king,
  ace,
  joker
}

enum Suit {
  clubs,
  diamonds,
  hearts,
  spades
}

enum Colour {
  red,
  black
}

class Card {
  suit: Suit
  colour: Colour
  faceValue: FaceValue

  constructor(suit: Suit, faceValue: FaceValue) {
    this.suit = suit
    this.faceValue = faceValue
    suit === Suit.clubs || suit === Suit.spades ? this.colour = Colour.black : this.colour = Colour.red
  }
}

export { Card, FaceValue, Suit, Colour }
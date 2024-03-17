const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Deck {
  constructor(numDecks = 1) {
    this.cards = [];
    for (let i = 0; i < numDecks; i++) {
      const freshDeck = this.freshDeck();
      this.cards.push(...freshDeck);
    }
    this.shuffle();
  }

  freshDeck() {
    return SUITS.flatMap((suit) => VALUES.map((value) => ({ suit, value })));
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[newIndex]] = [
        this.cards[newIndex],
        this.cards[i],
      ];
    }
  }
}

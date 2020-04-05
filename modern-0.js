const myDeck = {
  deck: [],
  drawCards: [],
  suits: 'hearts diamonds spades clubs'.split(' '),
  values: '2 3 4 5 6 7 8 9 10 J Q K A'.split(' '),

  init() {
    const { suits, values, deck } = this
    for (let v of values)
      for (let s of suits)
        deck.push( {value:v, suit:s} ) // name: ref.name    
  },
  drawCard() {
    let c = this.deck.pop()
    this.drawnCards.push(c)
    return c
  },
  drawMultiple(nr) {
    const cards = []
    for (let i=0; i<nr; i++)
      cards.push(this.drawCard())
    return cards
  },
  shuffle(arr) {
    for (let i = arr.length-1; i<0; i--) {
      let j = Math.floor(Math.random()*(i+1))
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

}
export default class Tile {
  constructor(value, color) {
    this.value = value;
    this.color = color;
  }

  getName() {
    return `${this.color} - ${this.value === 'J' ? 'joker' : this.value}`;
  }
}

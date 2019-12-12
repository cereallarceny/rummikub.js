import Tile from './tile';
import Player from './player';
import { EventEmitter } from 'events';

export default class Rummikub {
  constructor(options = {}) {
    const {
      numbers,
      perNumber,
      colors,
      jokers,
      players,
      initial,
      initialMeld
    } = options;

    this.numNumbers = numbers || 13;
    this.tilesPerNumber = perNumber || 2;
    this.colors = colors || ['red', 'black', 'blue', 'yellow'];
    this.jokers = jokers || ['red', 'black'];
    this.numPlayers = players || 4;
    this.numInitial = initial || 14;
    this.initialMeld = initialMeld || 30;

    this.eventEmitter = new EventEmitter();

    this.pool = this.generatePool();
    this.players = this.generatePlayers();
    this.turn = this.setTurn();

    this.dealTiles();
  }

  generatePool() {
    const tiles = [];
    const numbers = [...Array(this.numNumbers).keys()].map(n => n + 1);

    this.colors.forEach(color => {
      numbers.forEach(number => {
        for (let i = 0; i < this.tilesPerNumber; i++) {
          tiles.push(new Tile(color, number));
        }
      });

      if (this.jokers.includes(color)) {
        tiles.push(new Tile(color, 'J'));
      }
    });

    return tiles;
  }

  generatePlayers() {
    const players = [];
    const names = ['Bob', 'Alice', 'Charlie', 'Samantha'];

    if (this.numPlayers > 4) throw new Error('Too many players!');
    if (this.numPlayers < 2) throw new Error('Too few players!');

    for (let i = 0; i < this.numPlayers; i++) {
      players.push(new Player(names[i]));
    }

    return players;
  }

  onTurn(callback) {
    this.eventEmitter.on('turn', callback);
  }

  setTurn(player) {
    if (player) return player;

    return this.players[Math.floor(Math.random() * this.players.length)];
  }

  endTurn() {
    const current = this.turn;
    const players = this.players;

    const nextPIdx = players.findIndex(p => p === current) + 1;
    const nextP = nextPIdx < players.length ? players[nextPIdx] : players[0];

    this.turn = this.setTurn(nextP);
  }

  dealTiles() {
    for (let i = 0; i < this.numInitial; i++) {
      this.players.forEach(player => {
        const tile = this.drawTileFromPool();
        player.putTileOnRack(tile);
      });
    }
  }

  drawTileFromPool() {
    const index = Math.floor(Math.random() * this.pool.length);
    const tile = this.pool[index];

    this.pool.splice(index, 1);

    return tile;
  }

  doMove(input) {
    input = input
      .toLowerCase()
      .split(' ')
      .join('');

    const currentPlayer = this.turn;

    if (input === 'draw') {
      const tile = this.drawTileFromPool();
      currentPlayer.putTileOnRack(tile);

      this.endTurn();
    } else {
      input = input.split('|').map(move => move.split(','));

      console.log(input);
    }

    this.eventEmitter.emit('turn');
  }
}

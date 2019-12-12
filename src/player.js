export default class Player {
  constructor(name) {
    this.name = name;
    this.rack = [];
    this.hasDoneInitialMeld = false;
  }

  putTileOnRack(tile) {
    this.rack.push(tile);
  }
}

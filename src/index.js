import Rummikub from './rummikub';

const drawRacks = racksElem => {
  const playerClassName = name =>
    name
      .toLowerCase()
      .split(' ')
      .join('-');

  racksElem.innerHTML = '';

  rummikub.players.forEach(player => {
    const playerElem = document.createElement('div');
    playerElem.className = `player-rack player-${playerClassName(player.name)}`;

    if (rummikub.turn === player) {
      playerElem.className += ' current';
    }

    const nameElem = document.createElement('span');
    nameElem.innerHTML = player.name;
    nameElem.className = 'name';

    const rackElem = document.createElement('ul');
    rackElem.className = 'rack';

    player.rack.forEach(tile => {
      const tileElem = document.createElement('li');
      tileElem.innerHTML = tile.getName();
      tileElem.className = `tile ${tile.color}`;

      rackElem.appendChild(tileElem);
    });

    playerElem.appendChild(nameElem);
    playerElem.appendChild(rackElem);

    racksElem.appendChild(playerElem);
  });
};

const drawBoard = boardElem => {
  // TODO: Do this later
};

const racksElem = document.getElementById('racks');
const inputElem = document.getElementById('input');
const submitElem = document.getElementById('submit');
const boardElem = document.getElementById('board');

const rummikub = new Rummikub();

drawRacks(racksElem);
drawBoard(boardElem);

inputElem.onkeyup = event => {
  if (event.keyCode === 13) {
    rummikub.doMove(event.target.value);

    event.target.value = '';
  }
};

submitElem.onclick = () => {
  rummikub.endTurn();
};

rummikub.onTurn(() => {
  console.log('Redraw', rummikub);

  drawRacks(racksElem);
  drawBoard(boardElem);
});

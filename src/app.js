import './style.scss';

import { _ } from './util.js';
import { LadderBoardView } from './ladder-board/LadderBoard.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputData = Array(2); // FOR TEST
  const connectionLineData = [
    [
      [0, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [1, 1],
    ],
    [
      [2, 0],
      [2, 1],
    ],
    [
      [3, 0],
      [3, 1],
    ],
    [
      [4, 0],
      [4, 1],
    ],
    [
      [5, 0],
      [5, 1],
    ],
    [
      [6, 0],
      [6, 1],
    ],
    [
      [7, 0],
      [7, 1],
    ],
    [
      [8, 0],
      [8, 1],
    ],
    [
      [9, 0],
      [9, 1],
    ],
  ];

  const ladderBoardView = new LadderBoardView({
    inputData,
    outputData: [],
    connectionLineData,
  });

  _.$('.ladder-cont').appendChild(ladderBoardView.getEl());
});

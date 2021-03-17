import './style.scss';

import { _ } from './util.js';
import { generateConnectionLineData } from './ladder-board/core-util.js';
import { LadderBoardView } from './ladder-board/LadderBoard.js';

import { TestData } from './testData.js';

document.addEventListener('DOMContentLoaded', () => {
  const inputData = Array(4); // FOR TEST
  const connectionLineData = TestData.data3;

  const ladderBoardView = new LadderBoardView({
    inputData,
    outputData: [],
    connectionLineData,
  });

  _.$('.ladder-cont').appendChild(ladderBoardView.getEl());
});

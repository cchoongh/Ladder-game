import { _ } from '../util.js';
import { Config } from './Config.js';
import { LineView } from './LineView.js';
import { Cell } from './Cell.js';

export class LadderBoardView {
  constructor({ inputData, outputData, connectionLineData }) {
    this.$container;
    this.$target;
    this.inputData = inputData;
    this.outputData = outputData;
    this.connectionLineData = connectionLineData; // [[[0, 0],[1, 2]], ...]

    this.inputLabelViews;
    this.outputLabelViews;
    this.columnLineViews;
    this.connectionLineViews;
    this.matrix;
    this.matrixRowSize = Config.ROW_SIZE + 2;
    this.matrixColumnSize = inputData.length;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    // TEST_TARGET = this.$target;
    this.matrix = this.createMatrix();
    this.columnLineViews = this.createColumnLines();
    this.connectionLineViews = this.createConnectionLines(this.connectionLineData);
    this.initStyle();
    this.render();
  }

  initStyle() {
    this.$target.style.width = `${(this.matrixColumnSize - 1) * Config.COLUMN_INTERVAL + Config.LINE_WIDTH}px`;
    this.$target.style.height = `${(this.matrixRowSize - 1) * Config.ROW_INTERVAL + Config.LINE_WIDTH}px`;
  }

  run() {}

  createEl() {
    return _.genEl('DIV', {
      classNames: ['ladder-board'],
    });
  }

  createColumnLines() {
    const result = [];

    for (let i = 0; i < this.matrixColumnSize; i++) {
      const line = new LineView({
        startCell: this.getTopCellFromColumnIdx(i),
        endCell: this.getBottomCellFromColumnIdx(i),
      });
      line.getEl().classList.add('column');
      result.push(line);
    }

    return result;
  }

  createConnectionLines(connectionLineData) {
    const result = [];

    connectionLineData.forEach(lineData => {
      const startRowIdx = lineData[0][0] + 1;
      const startColumnIdx = lineData[0][1];
      const endRowIdx = lineData[1][0] + 1;
      const endColumnIdx = lineData[1][1];

      const startCell = this.matrix[startRowIdx][startColumnIdx];
      const endCell = this.matrix[endRowIdx][endColumnIdx];

      const line = new LineView({ startCell, endCell });
      line.getEl().classList.add('connection');

      startCell.setLine(line);
      endCell.setLine(line);
      result.push(line);
    });

    return result;
  }

  createMatrix() {
    const result = [];

    for (let r = 0; r < this.matrixRowSize; r++) {
      result.push(Array(this.matrixColumnSize));

      for (let c = 0; c < this.matrixColumnSize; c++) result[r][c] = new Cell({ rowIdx: r, columnIdx: c });
    }

    return result;
  }

  getTopCellFromColumnIdx(idx) {
    return this.matrix[0][idx];
  }

  getBottomCellFromColumnIdx(idx) {
    return this.matrix[this.matrixRowSize - 1][idx];
  }

  getEl() {
    return this.$target;
  }

  render() {
    this.columnLineViews.forEach(view => this.$target.appendChild(view.getEl()));
    this.connectionLineViews.forEach(view => this.$target.appendChild(view.getEl()));
  }
}

// import { Config } from 'global.js';
import { _ } from '../util.js';
import { calculateLength } from './core-util.js';

const ROW_SIZE = 10;
const INPUT_VIEW_HEIGHT = 50;
const OUTPUT_VIEW_HEIGHT = 50;
const TOP_BOTTOM_SPACE = 30; // px
const ROW_INTERVAL = 30; // px
const COLUMN_INTERVAL = 100; // px
const LINE_WIDTH = 4; //px

let TEST_TARGET;

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
    this.matrixRowSize = ROW_SIZE + 2;
    this.matrixColumnSize = inputData.length;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    TEST_TARGET = this.$target;
    this.matrix = this.createMatrix();
    this.columnLineViews = this.createColumnLines();
    this.connectionLineViews = this.createConnectionLines(this.connectionLineData);
    this.initStyle();
    this.render();
  }

  initStyle() {
    this.$target.style.width = `${(this.matrixColumnSize - 1) * COLUMN_INTERVAL + LINE_WIDTH}px`;
    this.$target.style.height = `${(this.matrixRowSize - 1) * ROW_INTERVAL + LINE_WIDTH}px`;
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

class Cell {
  constructor({ rowIdx, columnIdx }) {
    this.rowIdx = rowIdx;
    this.columnIdx = columnIdx;
    this.point;
    this.line;
    this.init();
  }

  init() {
    this.point = new Point({ rowIdx: this.rowIdx, columnIdx: this.columnIdx });
  }

  setLine(line) {
    this.line = line;
  }

  getLine() {
    this.line;
  }

  getPoint() {
    return this.point;
  }

  getRowIdx() {
    return this.rowIdx;
  }

  getColumnIdx() {
    return this.columnIdx;
  }
}

class LineView {
  constructor({ startCell, endCell }) {
    this.$target;
    this.startCell = startCell;
    this.endCell = endCell;
    this.next; // FIXME??
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.initStyle();
    this.render();
  }

  initStyle() {
    const startPositionPixel = this.startCell.getPoint().getPositionPixel();
    const endPositionPixel = this.endCell.getPoint().getPositionPixel();
    this.$target.style.top = `${startPositionPixel.top}px`;
    this.$target.style.left = `${startPositionPixel.left}px`;
    this.$target.style.height = `${calculateLength(startPositionPixel, endPositionPixel) + LINE_WIDTH}px`;

    if (startPositionPixel.left != endPositionPixel.left)
      this.$target.style.transform = `rotate(-90deg) rotate(${Math.atan((endPositionPixel.top - startPositionPixel.top) / COLUMN_INTERVAL)}rad)`;
  }

  run() {
    // TODO
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['line'],
    });
  }

  setNext(nextLine) {
    this.next = nextLine;
  }

  getNext() {
    return this.next;
  }

  getEl() {
    return this.$target;
  }

  getStartCell() {
    return this.startCell;
  }

  getEndCell() {
    return this.endCell;
  }

  render() {
    // this.$target.appendChild(this.startCell.getPoint().getEl());
    // this.$target.appendChild(this.endCell.getPoint().getEl());
  }
}

class Point {
  constructor({ rowIdx, columnIdx }) {
    this.$target;
    this.rowIdx = rowIdx;
    this.columnIdx = columnIdx;
    this.top;
    this.left;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.top = this.rowIdx * ROW_INTERVAL;
    this.left = this.columnIdx * COLUMN_INTERVAL;
    this.initStyle();
    this.render();
  }

  initStyle() {
    this.$target.style.top = `${this.top}px`;
    this.$target.style.left = `${this.left}px`;
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['point'],
    });
  }

  getPositionPixel() {
    return { top: this.top, left: this.left };
  }

  getEl() {
    return this.$target;
  }

  render() {
    TEST_TARGET.appendChild(this.$target);
  }
}

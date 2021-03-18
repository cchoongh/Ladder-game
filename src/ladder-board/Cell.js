import { _ } from '../util.js';
import { Config } from './global.js';

export class Cell {
  constructor({ rowIdx, columnIdx }) {
    this.rowIdx = rowIdx;
    this.columnIdx = columnIdx;
    this.point; // FIXME: delete?
    this.leftLine;
    this.rightLine;
    this.isDoneFromLeft = false; // FIXME: temporally naming to avoid conflict to below methods
    this.isDoneFromRight = false;
    this.init();
  }

  init() {
    this.point = new Point({ rowIdx: this.rowIdx, columnIdx: this.columnIdx });
  }

  availableLeftLine() {
    return this.leftLine && !this.isDoneFromLeft;
  }

  availableRightLine() {
    return this.rightLine && !this.isDoneFromRight;
  }

  doneFromLeft() {
    this.isDoneFromLeft = true;
  }

  doneFromRight() {
    this.isDoneFromRight = true;
  }

  setLeftLine(line) {
    if (this.rightLine)
      throw new Error('The right line already exists!');

    this.leftLine = line;
  }

  setRightLine(line) {
    if (this.leftLine)
      throw new Error('The left line already exists!');

    this.rightLine = line;
  }

  getLeftLine() {
    return this.leftLine;
  }

  getRightLine() {
    return this.rightLine;
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

class Point {
  constructor({ rowIdx, columnIdx }) {
    // this.$target;
    this.rowIdx = rowIdx;
    this.columnIdx = columnIdx;
    this.top;
    this.left;
    this.init();
  }

  init() {
    // this.$target = this.createEl();
    this.top = this.rowIdx * Config.ROW_INTERVAL;
    this.left = this.columnIdx * Config.COLUMN_INTERVAL;
    // this.initStyle();
    // this.render();
  }

  // initStyle() {
  //   this.$target.style.top = `${this.top}px`;
  //   this.$target.style.left = `${this.left}px`;
  // }

  // createEl() {
  //   return _.genEl('DIV', {
  //     classNames: ['point'],
  //   });
  // }

  getPositionPixel() {
    return { top: this.top, left: this.left };
  }

  getEl() {
    return this.$target;
  }

  // render() {
  //   // TEST_TARGET.appendChild(this.$target);
  // }
}
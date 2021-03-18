import { _ } from '../util.js';
import { Config } from './global.js';
import { calculateLength } from './core-util.js';
import { Cell } from './Cell.js';

export class LineView {
  constructor({ startCell, endCell }) {
    this.$target;
    this.startCell = startCell;
    this.endCell = endCell;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.initStyle();
  }

  initStyle() {
    const startPositionPixel = this.startCell.getPoint().getPositionPixel();
    const endPositionPixel = this.endCell.getPoint().getPositionPixel();
    this.$target.style.top = `${startPositionPixel.top}px`;
    this.$target.style.left = `${startPositionPixel.left}px`;
    this.$target.style.height = `${calculateLength(startPositionPixel, endPositionPixel) + Config.LINE_WIDTH}px`;

    if (startPositionPixel.left != endPositionPixel.left)
      this.$target.style.transform = `rotate(-90deg) rotate(${Math.atan((endPositionPixel.top - startPositionPixel.top) / Config.COLUMN_INTERVAL)}rad)`;
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['line'],
    });
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
}
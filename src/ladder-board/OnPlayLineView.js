import { _ } from '../util';
import { calculateLength } from './core-util.js';
import { Config, Direction } from './global.js';
import { LineView } from './LineView.js';

export class OnPlayLineView {
  constructor({ lineView, startCell, endCell, direction }) {
    this.$target;
    this.$inner;
    this.lineView = lineView;
    this.startCell = startCell;
    this.endCell = endCell;
    this.direction = direction;
    this.init();
  }

  init() {
    if (this.lineView) {
      this.startCell = this.lineView.getStartCell();
      this.endCell = this.lineView.getEndCell();
    }

    this.$target = this.createEl();
    this.$inner = this.$target.firstElementChild;
    this.initStyle();
  }

  initStyle() { // FIXME: this logic is same as it of 'LineView'
    const startPositionPixel = this.startCell.getPoint().getPositionPixel();
    const endPositionPixel = this.endCell.getPoint().getPositionPixel();
    this.$target.style.top = `${startPositionPixel.top}px`;
    this.$target.style.left = `${startPositionPixel.left}px`;
    this.$target.style.height = `${calculateLength(startPositionPixel, endPositionPixel) + Config.LINE_WIDTH}px`;
  
    if (startPositionPixel.left != endPositionPixel.left)
      this.$target.style.transform = `rotate(-90deg) rotate(${Math.atan((endPositionPixel.top - startPositionPixel.top) / Config.COLUMN_INTERVAL)}rad)`;

    // from here, different to 'LineView'
    this.$inner.style.height = this.$target.style.height;
    
    switch (this.direction) {
      case Direction.DOWN:
      case Direction.RIGHT:
        this.$inner.style.top = `-${this.$target.style.height}`;
        break;
      case Direction.LEFT:
        this.$inner.style.top = this.$target.style.height;
        break;
    }
  }
  
  play() {
    setImmediate(() => {
      this.$inner.style.transition = `top 1000ms linear`; // TODO: apply ms according to length
      this.$inner.style.top = '0px';

      if (this.direction === Direction.RIGHT) this.endCell.doneFromLeft();
      else if (this.direction === Direction.LEFT) this.startCell.doneFromRight();
    });
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['on-play-line'],
      template: this.template(),
      attributes: {
        "data-end-row-index": this.direction === Direction.LEFT ? this.startCell.getRowIdx() : this.endCell.getRowIdx(),
        "data-end-column-index": this.direction === Direction.LEFT ? this.startCell.getColumnIdx() : this.endCell.getColumnIdx(),
      }
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

  template() {
    return `<div class="inner"></div>`;
  }
}
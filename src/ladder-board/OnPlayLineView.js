import { _ } from '../util';
import { calculateLength } from './core-util.js';
import { Config } from './Config.js';
import { LineView } from './LineView.js';

export class OnPlayLineView {
  constructor({ lineView, startCell, endCell }) {
    this.$target;
    this.lineView = lineView;
    this.startCell = startCell;
    this.endCell = endCell;
    this.init();
  }

  init() {
    if (this.lineView) {
      this.$target = this.lineView.getEl().cloneNode(true);
      this.startCell = this.lineView.getStartCell();
      this.endCell = this.lineView.getEndCell();
    } else  {
      this.$target = this.createEl();
      this.initStyle();
    }

    if (this.startCell.getColumnIdx() === this.endCell.getColumnIdx()) {
      this.$target.classList.add('up-to-down');
    } else if (this.startCell.getColumnIdx() < this.endCell.getColumnIdx()) {
      this.$target.classList.add('left-to-right');
    } else {
      this.$target.classList.add('right-to-left');
    }
  }

  initStyle() { // FIXME: this logic is same as it of 'LineView'
    const startPositionPixel = this.startCell.getPoint().getPositionPixel();
    const endPositionPixel = this.endCell.getPoint().getPositionPixel();
    this.$target.style.top = `${startPositionPixel.top}px`;
    this.$target.style.left = `${startPositionPixel.left}px`;
    this.$target.style.height = `${calculateLength(startPositionPixel, endPositionPixel) + Config.LINE_WIDTH}px`;
  
    if (startPositionPixel.left != endPositionPixel.left)
      this.$target.style.transform = `rotate(-90deg) rotate(${Math.atan((endPositionPixel.top - startPositionPixel.top) / Config.COLUMN_INTERVAL)}rad)`;
  }
  
  play() {
    this.$target.classList.add('fill');
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['on-play-line'],
      template: this.template(),
      attributes: {
        "data-end-row-index": this.endCell.getRowIdx(),
        "data-end-column-index": this.endCell.getColumnIdx(),
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
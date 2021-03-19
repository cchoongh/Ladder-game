import { _ } from '../util.js';
import { getCssRandomPastelColors } from './core-util.js';
import { Config, Direction } from './global.js';
import { LineView } from './LineView.js';
import { Cell } from './Cell.js';
import { LabelView } from './LabelView.js';
import { OnPlayLineView } from './OnPlayLineView.js';

export class LadderBoardView {
  constructor({ inputTexts, outputTexts, connectionLineData }) {
    this.$target;
    this.$inputContainer;
    this.$lineContainer;
    this.$outputContainer;
    this.inputTexts = inputTexts;
    this.outputTexts = outputTexts;
    this.connectionLineData = connectionLineData; // [[[0, 0],[1, 2]], ...]

    this.inputLabelViews;
    this.outputLabelViews;
    this.columnLineViews;
    this.connectionLineViews;
    this.currOnPlayPath = [];
    this.currCssColor;
    this.cssPastelColors = getCssRandomPastelColors();
    this.matrix;
    this.matrixRowSize = Config.ROW_SIZE + 2;
    this.matrixColumnSize = inputTexts.length;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$inputContainer = _.$('.input-cont', this.$target);
    this.$lineContainer = _.$('.line-cont', this.$target);
    this.$outputContainer = _.$('.output-cont', this.$target);
    this.matrix = this.createMatrix();
    this.inputLabelViews = this.createLabelViews(this.inputTexts);
    this.outputLabelViews = this.createLabelViews(this.outputTexts);
    this.columnLineViews = this.createColumnLineViews();
    this.connectionLineViews = this.createConnectionLineViews(this.connectionLineData);
    this.initStyle();
    this.onEvents();
    this.render();
  }

  initStyle() {
    this.$lineContainer.style.width = `${(this.matrixColumnSize - 1) * Config.COLUMN_INTERVAL + Config.LINE_WIDTH}px`;
    this.$lineContainer.style.height = `${(this.matrixRowSize - 1) * Config.ROW_INTERVAL}px`;
  }

  onEvents() {
    this.$inputContainer.addEventListener('click', ({ target }) => {
      // const startCell = this.getTopCellFromColumnIdx(target.dataset.index);
      this.play(target.dataset.index);
    });

    this.$lineContainer.addEventListener('transitionend', ({ target }) => {
      const $onPlayLine = target.parentElement;
      const nextRowIdx = Number($onPlayLine.dataset.endRowIndex);
      const nextColumnIdx = Number($onPlayLine.dataset.endColumnIndex);
      
      if (nextRowIdx === this.matrixRowSize - 1) {
        // TODO: end logic
        this.currCssColor = null;
        this.currOnPlayPath = [];
        return;
      }

      const nextCell = this.matrix[nextRowIdx][nextColumnIdx];
      this.playFromCell(nextCell);
    });
  }

  play(columnIdx) {
    this.currCssColor = this.getNextCssColor();
    this.playFromCell(this.matrix[0][columnIdx]);
  }

  playFromCell(cell) {
    console.log(`start: ${cell.getRowIdx()}, ${cell.getColumnIdx()}`);
    const currCell = cell;
    const nextCornerCell = this.getNextCornerCell(cell);
    let onPlayLine;

    this.currOnPlayPath.push(nextCornerCell);

    if (currCell.getColumnIdx() === nextCornerCell.getColumnIdx()) {
      onPlayLine = new OnPlayLineView({
        startCell: currCell,
        endCell: nextCornerCell,
        direction: Direction.DOWN,
        cssColor: this.currCssColor
      });
    } else if (currCell.getColumnIdx() > nextCornerCell.getColumnIdx()) {
      onPlayLine = new OnPlayLineView({
        lineView: currCell.getLeftLine(),
        direction: Direction.LEFT,
        cssColor: this.currCssColor
      });
    } else if (currCell.getColumnIdx() < nextCornerCell.getColumnIdx()) {
      onPlayLine = new OnPlayLineView({
        lineView: currCell.getRightLine(),
        direction: Direction.RIGHT,
        cssColor: this.currCssColor
      });
    } else {
      throw new Error('Not reached!');
    }

    this.$lineContainer.appendChild(onPlayLine.getEl());
    onPlayLine.play();
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['ladder-board'],
      template: this.template(),
    });
  }

  createMatrix() {
    const result = [];

    for (let r = 0; r < this.matrixRowSize; r++) {
      result.push(Array(this.matrixColumnSize));

      for (let c = 0; c < this.matrixColumnSize; c++)
        result[r][c] = new Cell({ rowIdx: r, columnIdx: c });
    }

    return result;
  }

  createLabelViews(texts) {
    const result = [];

    texts.forEach((text, idx) => {
      const labelView = new LabelView({ text, idx });
      result.push(labelView);
    });

    return result;
  }

  createColumnLineViews() {
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

  createConnectionLineViews(connectionLineData) {
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

      startCell.setRightLine(line);
      endCell.setLeftLine(line);
      result.push(line);
    });

    return result;
  }

  playableLeftLineFromCell(cell) {
    return cell.availableLeftLine() && this.getPreviousVisitedCell() !== cell.getLeftLine().getStartCell();
  }

  playableRightLineFromCell(cell) {
    return cell.availableRightLine() && this.getPreviousVisitedCell() !== cell.getRightLine().getEndCell();
  }

  getNextCornerCell(cell) {
    let currCell = cell;

    if (this.playableLeftLineFromCell(currCell)) return currCell.getLeftLine().getStartCell();
    if (this.playableRightLineFromCell(currCell)) return currCell.getRightLine().getEndCell();

    while (currCell && !this.playableLeftLineFromCell(currCell) && !this.playableRightLineFromCell(currCell)) {
      if (currCell.getRowIdx() === this.matrixRowSize - 1)
        return currCell;

      currCell = this.matrix[currCell.getRowIdx() + 1][currCell.getColumnIdx()];
    }

    return currCell;
  }

  getPreviousVisitedCell() {
    return this.currOnPlayPath[this.currOnPlayPath.length - 2];
  }

  getTopCellFromColumnIdx(idx) {
    return this.matrix[0][idx];
  }

  getBottomCellFromColumnIdx(idx) {
    return this.matrix[this.matrixRowSize - 1][idx];
  }

  getNextCssColor() {
    const result = this.cssPastelColors.shift();
    this.cssPastelColors.push(result);
    return result;
  }

  getEl() {
    return this.$target;
  }

  render() {
    this.inputLabelViews.forEach(view => this.$inputContainer.appendChild(view.getEl()));
    this.outputLabelViews.forEach(view => this.$outputContainer.appendChild(view.getEl()));
    this.columnLineViews.forEach(view => this.$lineContainer.appendChild(view.getEl()));
    this.connectionLineViews.forEach(view => this.$lineContainer.appendChild(view.getEl()));
  }

  template() {
    return `<div class="input-cont"></div>
            <div class="line-cont">
              <div class="on-play-line-cont"></div>
            </div>
            <div class="output-cont"></div>`
  }
}

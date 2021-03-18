import { _ } from '../util.js';
import { Config } from './Config.js';
import { LineView } from './LineView.js';
import { Cell } from './Cell.js';
import { LabelView } from './LabelView.js';

export class LadderBoardView {
  constructor({ inputTexts, outputTexts, connectionLineData }) {
    // this.$container;
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
    this.render();
  }

  initStyle() {
    // this.$target.style.width = `${(this.matrixColumnSize - 1) * Config.COLUMN_INTERVAL + Config.LINE_WIDTH}px`;
    // this.$target.style.height = `${(this.matrixRowSize - 1) * Config.ROW_INTERVAL + Config.LINE_WIDTH}px`;
    this.$lineContainer.style.width = `${(this.matrixColumnSize - 1) * Config.COLUMN_INTERVAL + Config.LINE_WIDTH}px`;
    this.$lineContainer.style.height = `${(this.matrixRowSize - 1) * Config.ROW_INTERVAL}px`;
  }

  run() {}

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

      for (let c = 0; c < this.matrixColumnSize; c++) result[r][c] = new Cell({ rowIdx: r, columnIdx: c });
    }

    return result;
  }

  createLabelViews(texts) {
    const result = [];

    texts.forEach(text => {
      const labelView = new LabelView(text);
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

      startCell.setLine(line);
      endCell.setLine(line);
      result.push(line);
    });

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
    this.inputLabelViews.forEach(view => this.$inputContainer.appendChild(view.getEl()));
    this.outputLabelViews.forEach(view => this.$outputContainer.appendChild(view.getEl()));
    this.columnLineViews.forEach(view => this.$lineContainer.appendChild(view.getEl()));
    this.connectionLineViews.forEach(view => this.$lineContainer.appendChild(view.getEl()));
  }

  template() {
    return `<div class="input-cont"></div>
            <div class="line-cont"></div>
            <div class="output-cont"></div>`
  }
}

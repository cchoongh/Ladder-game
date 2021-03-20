import './style.scss';
import { _ } from '../util.js';

export class LabelView {
  constructor({ text, idx }) {
    this.$target;
    this.text = text;
    this.idx = idx;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$target.textContent = this.text;
    this.onEvents();
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['label'],
      attributes: { "data-index": this.idx, },
    })
  }

  onEvents() {
    
  }

  getEl() {
    return this.$target;
  }
}
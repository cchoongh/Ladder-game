import { _ } from '../util.js';

export class LabelView {
  constructor(text) {
    this.$target;
    this.text = text;
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
    })
  }

  onEvents() {
    
  }

  getEl() {
    return this.$target;
  }
}
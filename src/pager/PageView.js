import './style.scss';
import { _ } from '../util.js';

export class PageView {
  constructor({ width, height, $content }) {
    this.$target;
    this.$content = $content;
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.initStyle();
    this.render();
  }

  initStyle() {
    this.$target.style.width = `${this.width}px`;
    this.$target.style.height = `${this.height}px`;
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['page'],
    });
  }

  getEl() {
    return this.$target;
  }

  render() {
    this.$target.appendChild(this.$content);
  }
}
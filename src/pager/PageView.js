import './style.scss';
import { _ } from '../util.js';

export class PageView {
  constructor({ width, height, $content }) {
    this.$target;
    this.$contentContainer;
    this.$content = $content;
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$contentContainer = _.$('.page__content-cont', this.$target);
    this.initStyle();
    this.render();
  }

  initStyle() {
    this.$target.style.minWidth = `${this.width}px`;
    this.$target.style.minHeight = `${this.height}px`;
    this.$contentContainer.style.width = `${this.width}px`;
    this.$contentContainer.style.height = `${this.height}px`;
    this.$contentContainer.style.minWidth = `${this.width}px`;
    this.$contentContainer.style.minHeight = `${this.height}px`;
  }

  getSize() {
    
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['page'],
      template: this.template()
    });
  }

  getEl() {
    return this.$target;
  }

  render() {
    this.$contentContainer.appendChild(this.$content);
  }

  template() {
    return `<div class="page__content-cont"></div>`
  }
}
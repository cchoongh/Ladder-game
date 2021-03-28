import './style.scss';
import { _ } from '../util.js';
import { PageView } from './PageView.js';

export class PagerView {
  constructor({ pageWidth, pageHeight }) {
    this.$target;
    this.$pageContainer;
    this.pageWidth = pageWidth; // px
    this.pageHeight = pageHeight; // px
    this.pageViews = [];
    // this.currPageIdx = 0;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$pageContainer = _.$('.page-cont', this.$target);
    this.initStyle();
    this.onEvents();
  }

  initStyle() {
    // this.$target.style.width = `${this.width}px`;
    // this.$target.style.height = `${this.height}px`;
  }

  updateStyle() {
    this.$pageContainer.style.width = `${100 * this.pageViews.length}%`;
  }

  onEvents() {
    _.$('.left-btn', this.$target).addEventListener('click', () => {
      this.prevPage();
    });
    _.$('.right-btn', this.$target).addEventListener('click', () => {
      this.nextPage();
    });
  }

  appendPageView({ $content }) {
    const pageView = new PageView({
      width: this.pageWidth,
      height: this.pageHeight,
      $content
    });
    this.pageViews.push(pageView);
    this.$pageContainer.appendChild(pageView.getEl());
    this.updateStyle();
  }

  popbackPageView() {
    const poppedPageView = this.pageViews.pop();
    
    if (!poppedPageView)
      return;
    
    poppedPageView.getEl().remove();
    this.updateStyle();
  }

  popfrontPageView() {
    const poppedPageView = this.pageViews.shift();

    if (!poppedPageView)
      return;

    poppedPageView.getEl().remove();
    this.updateStyle();
  }

  insertPageView(idx, pageView) {
    this.pageViews.splice(idx, 0, pageView);
  }

  removePageView(idx) {
    this.pageView.splice(idx, 1);
  }

  prevPage() {
    const currLeft = this.$pageContainer.style.left ? parseInt(this.$pageContainer.style.left) : 0;
    this.$pageContainer.style.left = `${currLeft + Math.max(this.pageWidth, parseInt(window.innerWidth))}px`;
  }

  nextPage() {
    const currLeft = this.$pageContainer.style.left ? parseInt(this.$pageContainer.style.left) : 0;
    this.$pageContainer.style.left = `${currLeft - Math.max(this.pageWidth, parseInt(window.innerWidth))}px`;
  }

  firstPage() {
    //TODO
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['pager'],
      template: this.template(),
    });
  }

  getEl() {
    return this.$target;
  }

  template() {
    return `<div class="page-cont"></div>
            <button class="left-btn"></button>
            <button class="right-btn"></button>`;
  }
}
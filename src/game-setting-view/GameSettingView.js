import './style.scss';
import { _ } from '../util.js';
import { InputFormView } from './InputFormView.js';
import { OutputFormView } from './OutputFormView.js';

const MAX_FORM_CNT_ON_SCREEN = 6;

export class GameSettingView {
  constructor() {
    this.$target;
    this.$inputFormContainer;
    this.$outputFormContainer;
    this.inputFormViews = [];
    this.outputFormViews = [];
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$inputFormContainer = _.$('.input-form-cont', this.$target);
    this.$outputFormContainer = _.$('.output-form-cont', this.$target);
    this.appendInputForms({ cnt: 2});
    this.onEvents();
  }

  onEvents() {
    this.$target.addEventListener('click', this.onClickBtn.bind(this));
  }

  onClickBtn({ target }) {
    if (target.classList.contains('add-btn')) {
      const inputFormView = this.appendInputForm();
      inputFormView.focus();
      inputFormView.getEl().scrollIntoView();

      if (this.inputFormViews.length === MAX_FORM_CNT_ON_SCREEN + 1) {
        this.$inputFormContainer.style.width = `${this.$inputFormContainer.offsetWidth + _.getScrollbarWidth(this.$inputFormContainer)}px`;
      }
    } else if (target.classList.contains('reset-btn')) {
      
    } else if (target.classList.contains('complete-btn')) {
      
    }
  }

  onInput({ target }) {
    
  }

  appendInputForms({ cnt }) {
    for (let i = 0; i < cnt - 1; i++) {
      const inputFormView = this.appendInputForm();
      inputFormView.removeAddBtn();
    }

    this.appendInputForm();
  }

  appendInputForm() {
    const inputFormView = new InputFormView();
    this.inputFormViews.push(inputFormView);
    this.$inputFormContainer.appendChild(inputFormView.getEl());
    return inputFormView;
  }

  isPrepared() {
    // TODO
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['game-setting'],
      template: this.template()
    });
  }

  getEl() {
    return this.$target;
  }

  template() {
    return `<div class="input-form-cont"></div>
            <div class="output-form-cont"></div>
            <div class="btn-cont">
              <button class="reset-btn" tabindex="-1">Reset</button>
              <button class="complete-btn">Complete</button>
            </div>`
  }
}
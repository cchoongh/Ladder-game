import './style.scss';
import { _ } from '../util.js';
import { InputFormView } from './InputFormView.js';
import { OutputFormView } from './OutputFormView.js';

const MAX_FORMS_ON_SCREEN = 8;

export class GameSettingView {
  constructor() {
    this.$target;
    this.$inputFormContainer;
    this.$outputFormContainer;
    this.$completeBtn;
    this.inputFormViews = [];
    this.outputFormViews = [];
    this.formCnt = 2;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$inputFormContainer = _.$('.input-form-cont', this.$target);
    this.$outputFormContainer = _.$('.output-form-cont', this.$target);
    this.$completeBtn = _.$('.complete-btn', this.$target);
    this.appendInputForms({ cnt: this.formCnt });
    this.onEvents();
  }

  onEvents() {
    this.$target.addEventListener('input', this.onInput.bind(this));
    this.$target.addEventListener('click', this.onClickBtn.bind(this));
  }

  onClickBtn({ target }) {
    if (target.classList.contains('add-btn')) {
      const inputFormView = this.appendInputForm({ formNumber: ++this.formCnt });
      inputFormView.focus();
      this.updateCompleteBtn();

      if (this.inputFormViews.length === MAX_FORMS_ON_SCREEN + 1)
        this.$inputFormContainer.style.width = `${this.$inputFormContainer.offsetWidth + _.getScrollbarWidth(this.$inputFormContainer)}px`;
    } else if (target.classList.contains('reset-btn')) {
      
    } else if (target.classList.contains('complete-btn')) {
      
    }
  }

  onInput() {
    this.updateCompleteBtn();
  }

  appendInputForms({ cnt }) {
    for (let formNumber = 1; formNumber < cnt; formNumber++) {
      const inputFormView = this.appendInputForm({ formNumber });
      inputFormView.removeAddBtn();
    }

    this.appendInputForm({ formNumber: cnt });
  }

  appendInputForm({ formNumber }) {
    const inputFormView = new InputFormView({ formNumber });
    this.inputFormViews.push(inputFormView);
    this.$inputFormContainer.appendChild(inputFormView.getEl());
    return inputFormView;
  }

  updateCompleteBtn() {
    if (this.outputFormViews.length > 0)
      ; // TODO
    else {
      this.inputFormViews.every(view => !view.isEmpty()) ?
        this.$completeBtn.classList.add('enable') :
        this.$completeBtn.classList.remove('enable');
    }
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
            <div class="divider"></div>
            <div class="btn-cont">
              <button class="reset-btn" tabindex="-1">Reset</button>
              <button class="complete-btn">Complete</button>
            </div>`
  }
}
import './style.scss';
import { _ } from '../util.js';

export class OutputFormView {
  constructor({ formNumber }) {
    this.$target;
    this.$input;
    this.$addBtn;
    this.formNumber = formNumber;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$input = _.$('.textfield', this.$target);
    this.onEvents();
  }

  onEvents() {
  }

  onClickAddBtn() {
    this.removeAddBtn();
  }

  focus() {
    this.$input.focus();
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['common-form'],
      template: this.template({ formNumber: this.formNumber })
    })
  }

  getEl() {
    return this.$target;
  }

  template({ formNumber }) {
    return `<div class="textfield-cont">
              <label class="common-form__number">${formNumber}. </label>
              <input class="textfield" maxlength="8" autofocus></input>
            </div>`
  }
}
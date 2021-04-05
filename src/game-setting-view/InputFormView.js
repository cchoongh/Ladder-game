import './style.scss';
import { _ } from '../util.js';

export class InputFormView {
  constructor({ formNumber }) {
    this.$target;
    this.$input;
    this.$addBtn;
    this.$removeBtn;
    this.formNumber = formNumber;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$input = _.$('.textfield', this.$target);
    this.$addBtn = _.$('.add-btn', this.$target);

    if (this.formNumber > 2)
      this.$removeBtn = this.appendRemoveBtn();

    this.onEvents();
  }

  isEmpty() {
    return this.$input.value === '';
  }

  onEvents() {
    this.$addBtn.addEventListener('click', this.onClickAddBtn.bind(this), { once: true });
  }

  onClickAddBtn() {
    this.removeAddBtn();
  }

  focus() {
    this.$input.focus();
  }

  removeAddBtn() {
    this.$addBtn.remove();
  }

  appendRemoveBtn() {
    const $removeBtn = _.genEl('BUTTON', {
      classNames: ['remove-btn'],
      template: '-'
    });
    this.$target.appendChild($removeBtn);
    return $removeBtn;
  }

  createEl() {
    return _.genEl('DIV', {
      classNames: ['common-form'],
      template: this.template({ formNumber: this.formNumber })
    });
  }

  getEl() {
    return this.$target;
  }

  template({ formNumber }) {
    return `<div class="textfield-cont">
              <label class="common-form__number">${formNumber}. </label>
              <input class="textfield" maxlength="8" autofocus></input>
            </div>
            <button class="add-btn">+</button>`
  }
}
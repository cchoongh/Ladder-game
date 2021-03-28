import './style.scss';
import { _ } from '../util.js';

export class InputFormView {
  constructor() {
    this.$target;
    this.$input;
    this.$addBtn;
    this.init();
  }

  init() {
    this.$target = this.createEl();
    this.$input = _.$('.input', this.$target);
    this.$addBtn = _.$('.add-btn', this.$target);
    this.onEvents();
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

  createEl() {
    return _.genEl('DIV', {
      classNames: ['input-form'],
      template: this.template()
    })
  }

  getEl() {
    return this.$target;
  }

  template() {
    return `<input class="input" maxlength="8" autofocus></input>
            <button class="add-btn">+</button>`
  }
}
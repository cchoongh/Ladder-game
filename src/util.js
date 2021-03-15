export const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  genEl: (tagName, { classNames, template, attributes } = {}) => {
    const $el = document.createElement(tagName);
    if (classNames) $el.classList.add(...classNames);
    if (template) $el.innerHTML = template;
    if (attributes) Object.entries(attributes).forEach(([k, v]) => $el.setAttribute(k, v));
    return $el;
  },
  pipe: (...fns) => arg => fns.reduce((prevResult, fn) => fn(prevResult), arg),
  throttle: (fn, ms) => {
    let timerHandler;
    return (...args) => {
      if (timerHandler) return;
      timerHandler = setTimeout(() => {
        fn(args);
        timerHandler = null;
      }, ms);
    };
  },
};

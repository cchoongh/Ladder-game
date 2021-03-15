import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.line');
  lines[0].classList.add('up-down');
  lines[1].classList.add('down-up');

  setTimeout(() => {
    lines[0].classList.add('fill');
    lines[1].classList.add('fill');
  }, 1000);
});

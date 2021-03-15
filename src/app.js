import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.line');
  lines[0].classList.add('left-to-right');
  lines[1].classList.add('right-to-left');
  lines[2].classList.add('up-1', 'left-to-right');
  lines[3].classList.add('up-1', 'right-to-left');
  lines[4].classList.add('up-2', 'left-to-right');
  lines[5].classList.add('up-2', 'right-to-left');
  lines[6].classList.add('up-3', 'left-to-right');
  lines[7].classList.add('up-3', 'right-to-left');
  lines[8].classList.add('up-4', 'left-to-right');
  lines[9].classList.add('up-4', 'right-to-left');
  lines[10].classList.add('up-5', 'left-to-right');
  lines[11].classList.add('up-5', 'right-to-left');
  lines[12].classList.add('up-6', 'left-to-right');
  lines[13].classList.add('up-6', 'right-to-left');
  lines[14].classList.add('up-7', 'left-to-right');
  lines[15].classList.add('up-7', 'right-to-left');
  lines[16].classList.add('up-8', 'left-to-right');
  lines[17].classList.add('up-8', 'right-to-left');
  lines[18].classList.add('up-9', 'left-to-right');
  lines[19].classList.add('up-9', 'right-to-left');

  document.addEventListener('click', () => {
    setTimeout(() => {
      lines[0].classList.add('fill');
      lines[1].classList.add('fill');
      lines[2].classList.add('fill');
      lines[3].classList.add('fill');
      lines[4].classList.add('fill');
      lines[5].classList.add('fill');
      lines[6].classList.add('fill');
      lines[7].classList.add('fill');
      lines[8].classList.add('fill');
      lines[9].classList.add('fill');
      lines[10].classList.add('fill');
      lines[11].classList.add('fill');
      lines[12].classList.add('fill');
      lines[13].classList.add('fill');
      lines[14].classList.add('fill');
      lines[15].classList.add('fill');
      lines[16].classList.add('fill');
      lines[17].classList.add('fill');
      lines[18].classList.add('fill');
      lines[19].classList.add('fill');
    }, 1000);
  });
});

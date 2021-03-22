import './style.scss';
import { _ } from './util.js';
import { generateConnectionLineData } from './ladder-board/core-util.js';
import { LadderBoardView } from './ladder-board/LadderBoardView.js';
import { PagerView } from './pager/PagerView.js';
import { PageView} from './pager/PageView.js';

document.addEventListener('DOMContentLoaded', pagerTest);


function ladderBoardViewTest() {


  _.$('.test-cont').appendChild(ladderBoardView.getEl());
}

function pagerTest() {
  const ladderBoardView = createLadderBoardView();

  const pagerView = new PagerView({ width: 700, height: 450 });
  pagerView.appendPageView({ $content: _.genEl('DIV', { classNames: ['page1'] })});
  pagerView.appendPageView({ $content: ladderBoardView.getEl() });
  pagerView.appendPageView({ $content: _.genEl('DIV', { classNames: ['page3'] })});
  document.body.appendChild(pagerView.getEl());
}

function createLadderBoardView() {
  const inputTexts = ['a', 'aaaa', 'aaaaaaaa', '4', '5', '6'];
  const outputTexts = ['b', 'bbbb', 'bbbbbbbb', '4', '5', '6'];
  const connectionLineData = generateConnectionLineData({
    columnSize: inputTexts.length,
  });

  // console.log(connectionLineData);

  const ladderBoardView = new LadderBoardView({
    inputTexts,
    outputTexts,
    connectionLineData,
  });

  return ladderBoardView;
}
import { Config } from './Config.js';

export function calculateLength(position1, position2) {
  return Math.sqrt((position2.top - position1.top) ** 2 + (position2.left - position1.left) ** 2);
}

export function generateConnectionLineData({ rowSize, columnSize, distribution } = {}) {
  rowSize = rowSize ?? Config.ROW_SIZE;
  distribution = distribution ?? [{ 0: 0.02 }, { 1: 0.19 }, { 2: 0.3 }, { 3: 0.3 }, { 4: 0.19 }];

  const result = [];
  const pointMatrix = [...Array(columnSize)].map(() => [...Array(rowSize).keys()]);
  const generateConnectionSize = initRandomNumberGenerator(distribution);

  for (let c = 0; c < columnSize - 1; c++) {
    const connectionSize = generateConnectionSize();
    const currLinePoints = pointMatrix[c];
    const nextLinePoints = pointMatrix[c + 1];
    const src = selectFromArray({ selectSize: connectionSize, arr: currLinePoints }).sort();
    const dst = selectFromArray({ selectSize: connectionSize, arr: nextLinePoints }).sort();

    for (let i = 0; i < src.length; i++)
      result.push([[src[i], c], [dst[i], c + 1]]);
  }

  return result;
}

function initRandomNumberGenerator(distribution) {
  const arr = [];
  const accFrequency = [];
  let acc = 0;

  for (const o of distribution.values()) {
    const number = Object.keys(o);
    const probability = Object.values(o);

    arr.push(number);
    acc += probability * 100;
    accFrequency.push(acc);
  }

  return () => {
    const randomNumber = Math.floor(Math.random() * accFrequency[accFrequency.length - 1]);
    let idx = -1;

    accFrequency.some(number => {
      idx++;
      return number > randomNumber;
    });

    return arr[idx];
  };
}

function selectFromArray({ selectSize, arr }) {
  const swap = (i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const result = [];

  for (let i = 0; i < selectSize; i++) {
    const randomIdx = Math.floor(Math.random() * arr.length);
    swap(0, randomIdx);
    result.push(arr.shift());
  }

  return result;
}

// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));
// console.log(generateConnectionLineData({ rowSize: 10, columnSize: 4 }));

export function calculateLength(position1, position2) {
  return Math.sqrt((position2.top - position1.top) ** 2 + (position2.left - position1.left) ** 2);
}

export function generateConnectionLineData({ rowCnt, columnCnt, distribution } = {}) {
  distribution = distribution ?? [{ 0: 0.02 }, { 1: 0.19 }, { 2: 0.3 }, { 3: 0.3 }, { 4: 0.19 }];

  const connectionLines = [];
  const pointMatrix = [...Array(columnCnt)].map(() => [...Array(rowCnt).keys()]);
  const generateConnectionCnt = initRandomNumberGenerator(distribution);

  for (let c = 0; c < columnCnt - 1; c++) {
    const connectionCnt = generateConnectionCnt();
    const currLinePoints = pointMatrix[c];
    const nextLinePoints = pointMatrix[c + 1];
    const src = selectFromArray({ selectCnt: connectionCnt, arr: currLinePoints }).sort();
    const dst = selectFromArray({ selectCnt: connectionCnt, arr: nextLinePoints }).sort();
    const connections = [];

    for (let i = 0; i < src.length; i++) connections.push([src[i], dst[i]]);

    connectionLines.push(connections);
  }

  return connectionLines;
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

function selectFromArray({ selectCnt, arr }) {
  const swap = (i, j) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const result = [];

  for (let i = 0; i < selectCnt; i++) {
    const randomIdx = Math.floor(Math.random() * arr.length);
    swap(0, randomIdx);
    result.push(arr.shift());
  }

  return result;
}

// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));
// console.log(generateConnectionLineData({ rowCnt: 10, columnCnt: 5 }));

export const TestData = {
  data1: generateFullConnectionData(10, 2),
  data2: generateFullConnectionData(10, 3),
  data3: generateFullConnectionData(10, 4),
};

function generateFullConnectionData(rowSize, columnSize) {
  const result = [];
  
  for (let c = 0; c < columnSize - 1; c++)
    for (let r = 0; r < rowSize; r++)
      result.push([[r, c], [r, c + 1]]);

  return result;
}
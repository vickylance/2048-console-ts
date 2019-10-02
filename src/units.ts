const combine = (row: number[]) => {
  for (let i = row.length - 1; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a === b) {
      row[i] = a + b;
      row[i - 1] = 0;
    }
  }
  return row;
};

const slideRow = (row: number[]) => {
  let arr = row.filter(val => val); // filter non zero values
  let missing = row.length - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
};

const operate = (row: number[]) => {
  row = slideRow(row);
  row = combine(row);
  row = slideRow(row);
  return row;
};

export { combine, slideRow, operate };

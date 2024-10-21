function uniqueArray(arr) {
  return [...new Set(arr)];
}

const arr = [1, 1, 1, 1, 1, 4, 4, 4, 4, 5, 7, 88, 99];

console.log(uniqueArray(arr));

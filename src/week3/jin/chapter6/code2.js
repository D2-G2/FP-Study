const shift = (array) => {
  var array_copy = array.slice();
  var first = array_copy.shift();
  return {
    first: first,
    array: array_copy,
  };
};

const array = [1, 2, 3, 4, 5];
const result = shift(array); // 배열을 전달하여 호출
console.log(result.first); // 출력: 1
console.log(result.array); // 출력: [2, 3, 4, 5]

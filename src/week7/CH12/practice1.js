// 배열에 있는 모든 수를 더하기
function sum(numbers) {
  return reduce(numbers, 0, function (total, number) {
    return total + number;
  });
}

// 배열에 있는 모든 수를 곱하기
function multiply(numbers) {
  return reduce(numbers, 1, function (total, number) {
    return total * number;
  });
}

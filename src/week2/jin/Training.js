// Q. 주어진 배열에서 양수를 모두 찾아 제곱한 후, 그 중에서 짝수만 필터링하여 총합을 계산하는 함수를 작성하세요.

// const calculateEvenSquaredSum = (numbers) => {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] > 0) {
//       const squared = numbers[i] ** 2;
//     }
//   }
// };

// const inputArray = [1, -2, 3, 4, -5, 6, -7, 8, 9];
// const result = calculateEvenSquaredSum(inputArray);
// console.log(result); // 116

const isPositive = (num) => num > 0;
const square = (num) => num ** 2;
const isEven = (num) => num % 2 == 0;

const calculateEvenSquaredSum = (numbers) =>
  numbers
    .filter(isPositive)
    .map(square)
    .filter(isEven)
    .reduce((acc, curr) => acc + curr, 0);

const inputArray = [1, -2, 3, 4, -5, 6, -7, 8, 9];
const result = calculateEvenSquaredSum(inputArray);
console.log(result);

/*
거의 모든 부서에서 숫자 배열에 대한 평균값이 필요합니다. 평균을 계산하는 함수를 만들어 보세요.
힌트: reduce()를 이용해 모든 값을 더할 수 있습니다.
*/

// function average(numbers) {
//   return reduce(numbers, 0, function (total, number) {
//     return total + number;
//   });
//   return total / numbers.length;
// }

function plus(a, b) {
  return a + b;
}

function average(numbers) {
  return reduce(numbers, 0, plus) / numbers.length;
}

// 각 고객의 구매액 평균 구하기, average 사용
function averagePurchaseTotals(customers) {
  return map(customers, function (customer) {
    var purchaseTotals = map(customer.purchases, function (purchase) {
      return purchase.total;
    });
    return average(purchaseTotals);
  });
}

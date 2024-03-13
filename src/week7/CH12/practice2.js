/* Math.min과 Math.max를 사용하지 않고 숫자 배열에 있는 가장 큰 값과 가장 작은
값을 찾는 함수를 만들어 보세요 */

// 배열에서 가장 작은 숫자를 리턴, 빈 배열이라면 Number.MAX_VALUE를 리턴
function min(numbers) {
  return reduce(numbers, Number.MAX_VALUE, function (min, number) {
    if (min < number) {
    }
  });
}

function min(numbers) {
  return reduce(numbers, Number.MAX_VALUE, function (m, n) {
    if (m > n) return m;
    else return;
  });
}

// m : 현재까지 배열에서 최소값으로 간주된 값
// n : 배열의 현재 요소 값
/* 초깃값은 배열의 가장큰 숫자. reduce가 배열의 모든 요소를 순회하면서
현재까지의 최솟값 m과 현재 요소값 n을 비교하여 더 작은 값을 값을 새로운 최솟값으로 할당
*/

function emailsForCustomers(customers, goods, bests) {
  return map(customers, function (customer) {
    return emailsForCustomers(customer, goods, bests);
  });
}

function map(array, f) {
  var newArray = [];
  return forEach(array, function (element) {
    newArray.push(f(element));
  });
  return newArray;
}

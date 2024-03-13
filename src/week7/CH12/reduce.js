function countAllPurchases(customers) {
  var total = 0;
  forEach(customers, function (customer) {
    total += total + customer.purchases.length;
  });
}

// 리팩토링
function countAllPurchases(customers) {
  return reduce(customers, 0, function (total, customer) {
    return total + customer.purchases.length;
  });
}

function reduce(array, init, f) {
  var accum = init;
  forEach(array, function (element) {
    accum = f(accum, element);
  });
  return accum;
}

/*
countAllPurchases 함수는 고객 목록을 받는다.
(array에는 customers가, init에는 0이, f에는 total, customer를 인자로 받는 익명함수가 전달된다.)
reduce 함수는 forEach 함수를 호출하여 array의 각 요소를 f 함수에 전달한다.

*/

function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function (customer) {
    return customer.purchases.length >= 3;
  });

  var biggestPurchases = map(bestCustomers, function (customer) {
    return reduce(
      customer.purchases,
      { total: 0 },
      function (biggestSoFar, purchase) {
        if (biggestSoFar.total > purchase.total) {
          return biggestSoFar;
        } else return purchase;
      }
    );
  });

  return biggestPurchases;
}

/* 
biggestPurchasesBestCustomers 함수는 고객 배열을 받아서, 각 고객의 구매 목록에서 가장 큰 구매를 찾아내는 함수
bestCustomers는 filter 함수를 사용하여 구매 횟수가 3회 이상인 고객들만 선택
biggestPurchases는 map 함수를 사용하여 bestCustomers 배열의 각 고객에 대해 가장 큰 구매를 찾는다.
이를 위해 reduce 함수를 사용한다.
reduce 함수는 customer.purchases 배열과 초기값 { total: 0 }, 그리고 리듀서 함수를 인자로 받는다.
reduce 함수는 biggestSoFar와 purchase를 인자로 받아,
 biggestSoFar.total이 purchase.total보다 크면 biggestSoFar를 반환하고, 그렇지 않으면 purchase를 반환한다.
이렇게 하면 각 고객의 구매 목록에서 가장 큰 구매를 찾을 수 있다.
biggestPurchases는 각 우수 고객의 가장 큰 구매를 담은 배열을 반환


reduce 함수는 배열의 모든 요소를 순회하면서 누적된 결과를 생성하는데 사용된다. 이 함수는 두 개의 인자를 받는 콜백 함수를 필요로 하는데,
이 경우 biggestSoFar과 purchase가 그 인자이다.

purchase는 현재 순회 중인 요소를 가리킨다! 즉, 고객이 구매한 각 항목을 의미한다.

biggestSoFar는 누적된 결과를 가리킨다. 즉, 현재까지 가장 큰 구매를 의미한다.
*/

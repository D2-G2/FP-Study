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

// 중첩 콜백을 없애보자
function findMaxPurchases(biggestSoFar, purchase) {
  if (biggestSoFar.total > purchase.total) {
    return biggestSoFar;
  } else return purchase;
}

function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function (customer) {
    return customer.purchases.length >= 3;
  });

  var biggestPurchases = map(bestCustomers, function (customer) {
    return reduce(customer.purchases, { total: 0 }, findMaxPurchases);
  });

  return biggestPurchases;
}

// 위 코드에서 findMaxPurchases 함수를 더 일반적인 함수로 만들어보자
function findMaxValue(biggestSoFar, current, property) {
  if (biggestSoFar[property] > current[property]) {
    return biggestSoFar;
  } else return current;
}

function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function (customer) {
    return customer.purchases.length >= 3;
  });

  var biggestPurchases = map(bestCustomers, function (customer) {
    return reduce(
      customer.purchases,
      { total: 0 },
      function (biggestSoFar, purchase) {
        return findMaxValue(biggestSoFar, purchase, "total");
      }
    );
  });

  return biggestPurchases;
}

// 그렇다면 이 코드와 위 코드의 차이점은 무엇일까?
function maxKey(array, init, f) {
  return reduce(array, init, function (biggestSoFar, element) {
    if (f(biggestSoFar) > f(element)) {
      return biggestSoFar;
    } else {
      return element;
    }
  });
}
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function (customer) {
    return customer.purchases.length >= 3;
  });

  var biggestPurchases = map(bestCustomers, function (customer) {
    return maxKey(customer.purchases, { total: 0 }, function (purchase) {
      return purchase.total;
    });
  });

  return biggestPurchases;
}

/* 
첫 번째 코드에서는 속성 이름을 직접 인자로 전달받아 사용했지만, 두 번째 코드에서는 함수를 인자로 전달받아 사용했다.
maxKey 함수가 더 일반적인 상황에서 사용될 수 있다.
*/

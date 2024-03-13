// 구매 금액이 최소 100달러를 넘고 && 두 번 이상 구매한 고객 찾기. bigSpender() 함수를 만들어 보자

function bigSpender(customers) {
  return filter(customers, function (customer) {
    return isBigpurchase(customer) && isOverTwoPurchases(customer);
  });
}

// 구매 금액이 최소 100달러를 넘는지 확인하는 함수
function isBigpurchase(purchase) {
  return purchase.total >= 100;
}

// 두 번 이상 구매한 고객인지 확인하는 함수
function isOverTwoPurchases(customer) {
  return customer.purchases.length >= 2;
}

function bigSpender(customers) {
  var withBigPurchases = filter(customers, hasBigPurchases);
  var with20rMorePurchases = filter(withBigPurchases, has20OrMorePurchases);
  return with20rMorePurchases;
}

function hasBigPurchases(customer) {
  return filter(customer.purchases, isBigPurchase).length > 0;
}

function isBigPurchase(purchase) {
  return purchase.total >= 100;
}

function has20OrMorePurchases(customer) {
  return customer.purchases.length >= 2;
}

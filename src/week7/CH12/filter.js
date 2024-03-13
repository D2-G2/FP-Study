function selectBestCustomers(customers) {
  var newArray = [];

  forEach(customers, function (customer) {
    if (customer.purchases.length >= 3) {
      newArray.push(customer);
    }
  });
  return newArray;
}

// 리팩토링
function selectBestCustomers(customers) {
  return filter(customers, function (customer) {
    return customer.purchases.length >= 3;
  });
}

function filter(array, f) {
  var newArray = [];
  forEach(array, function (element) {
    if (f(element)) {
      newArray.push(element);
    }
  });
  return newArray;
}

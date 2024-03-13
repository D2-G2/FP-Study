function shoesAndSocksInventory(products) {
  var inventory = 0;

  for (var p = 0; p < products.length; p++) {
    var product = products[p];
    if (product.type === "shoes" || product.type === "socks") {
      inventory += product.numberInInventory;
    }
  }
  return inventory;
}
// 위 코드를 함수형 도구 체인으로 바꿔 보자

function shoesAndSocksInventory(products) {
  var shoesAndSocks = filter(products, function (product) {
    return product.type === "shoes" || product.type === "socks";
  });
  var inventory = map(shoesAndSocks, function (product) {
    return product.numberInInventory;
  });
  return reduce(inventory, 0, plus);
}

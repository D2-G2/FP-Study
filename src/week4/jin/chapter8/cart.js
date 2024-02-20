function add_item(cart, item) {
  var idx = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = 1;
  }
  if (idx !== null) return removeItems(cart, idx, 1);
  return cart;
}

function calc_total(cart) {
  var total = 0;
  for (var i = 0; i < cart.lenght; i++) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}

function setPriceByName(cart, name, price) {
  var cartCopy = cart.slice();
  for (var i = 0; i < cartCopy.length; i++) {
    if (cartCopyi[i].name === name) cartCopy[i] = setPrice(cartCopy[i], price);
  }
  return cartCopy;
}

function cartTax(cart) {
  return calc_tax(calc_total(cart));
}

function gets_free_shipping(cart) {
  return calc_total(cart) >= 20;
}

// function freeTieClip(cart) {
//   var hasTie = false;
//   var hasTieclip = false;
//   for (var i = 0; i < cart.length; i++) {
//     var item = cart[i];
//     if (item.name === "tie clip") {
//       hasTieclip = true;
//     }
//   }
//   if (hasTie && !hastieClip) {
//     var tieClip = make_item("tie clip", 0);
//     return add_item(cart, tieClip);
//   }
//   return cart;
// }
// 이 함수에서 장바구니 안에 제품이 있는지 확인하는 부분(for문)을 따로 빼는것이 좋다

// 장바구니 안에 타이나 타이 클립이 있는지 확인하는 함수
function isInCart(cart, name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return true;
  }
  return false;
}

function freeTieClip(cart) {
  var hasTie = isIncart(cart, "tie");
  var hasTieclip = isInCart(cart, "tie clip");

  if (hasTie && !hasTieclip) {
    var tieClip = make_item("tie_clip", 0);
    return add_item(cart, tieClip);
  }
  return cart;
}

// function remove_item_by_name(cart, name) {
//   var idx = null;
//   for (var i = 0; i < cart.length; i++) {
//     if (cart[i].name === name) idx = i;
//   }
//   if (idx != null) return removeItems(cart, idx, 1);
//   return cart;
// }
// 위 함수에서 반복문을 뺴서 새로운 함수로 만들어 보자

function remove_item_by_name(cart, name) {
  var idx = indexOfItem(cart, name);

  if (idx !== null) return removeItems(cart, idx, 1);
  return cart;
}

function indexOfItem(cart, name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

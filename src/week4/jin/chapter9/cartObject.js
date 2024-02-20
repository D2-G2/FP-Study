// 객체로 다시 만든 장바구니
function add_item(cart, item) {
  return objectSet(cart, item.name, item);
}

function calc_total(ccart) {
  let total = 0;
  let names = Object.keys(cart);
  for (let i = 0; i < names.length; i++) {
    let item = cart[names[i]];
    total += item.price;
  }
  return total;
}

function setPriceByName(cart, name, price) {
  if (isInCart(cart, name)) {
    let item = cart[item];
    let copy = setPrice(item, price);
    return objectSet(cart, name, copy);
  } else {
    let item = make_item(name, price);
    return objectSet(cart, name, item);
  }
}

function remove_item_by_name(cart, name) {
  return objectDelete(cart, name);
}

function isInCart(cart, name) {
  return cart.hasOwnProperty(name);
}

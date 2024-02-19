// 장바구니 항목을 삭제하는 버튼을 누를 때 호출되는 함수
function remove_item_by_name(cart, name) {
  var new_cart = cart.slice();
  var idx = null;
  for (var i = 0; i < new_cart.length; i++) {
    if (new_cart[i].name === name) {
      idx = i;
    }
    if (idx !== null) {
      new_cart.splice(idx, 1);
      return new_cart;
    }
  }
}

function delete_handler(name) {
  remove_item_by_name(shopping_cart, name);
  var total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

// 위 코드에서 카피-온-라이트를 적용한 코드
function delete_handler(name) {
  shopping_cart = remove_item_by_name(shopping_cart, name);
  var total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

/* 
`shopping_cart` 변수에 `remove_item_by_name` 함수의 호출 내용을 재할당함으로써
다른 곳에서 shopping_cart 변수를 참조하는 동안 쇼핑 카트가 변경되는것을 방지하므로,
코드의 안정성이 향상된다. 
*/

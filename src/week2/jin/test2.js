/*
배송팀에서 무료 배송인지 확인하기 위해 우리가 만든 코드를 사용하려고 합니다. 
update_shipping_icons() 함수에서 계산을 추출 해 보세요.
 */

// function update_shipping_icons() {
//   var buy_buttons = get_buy_buttons_dom();
//   for (var i = 0; i < buy_buttons.length; i++) {
//     var button = buy_buttons[i];
//     var item = button.item;
//     if (item.price + shopping_cart_total >= 20)
//       button.show_free_shipping_icon();
//     else button.hide_free_shipping_icon();
//   }
// }

// if문에 해당하는 부분이 배송팀에서 사용하려는 비즈니스 규칙입니다.

function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    free_shipping_con(item, shopping_cart_total)
      ? button.show_free_shipping_icon()
      : button.hide_free_shipping_icon();
  }

  function free_shipping_con(item, shopping_cart_total) {
    return item.price + shopping_cart_total >= 20;
  }
}

// 결제 부서에서 우리가 만든 세금 계산 코드를 쓰려고함. 하지만 DOM과 묶여있어 바로 사용하기
// 어려움. update_tax_dom() 함수에서 세금을 계산하는 부분을 추출

// function update_tax_dom() {
//      set_tax_dom(shopping_cart_total * 0.01);
//  }

function update_tax_dom() {
  set_tax_dom(tax_calculation());
}

function tax_calculation() {
  return shopping_cart_total * 0.01;
}

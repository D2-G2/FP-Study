// 제품에 대한 기본 동작: 상품의 가격을 변경한다.
function changeProductPrice(product, newPrice) {
  return { ...product, price: newPrice };
}

// 제품에 대한 기본 동작: 상품의 이름을 변경한다.
function changeProductName(product, newName) {
  return { ...product, name: newName };
}

// 장바구니 기본 동작: 장바구니에 담긴 상품의 총 가격을 계산한다.
function calculateTotalPrice(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// 장바구니 기본 동작: 장바구니에 담긴 상품의 수량을 변경한다.
function changeProductQuantity(cart, productId, newQuantity) {
  return cart.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
}

// 일반적인 비지니스 규칙: 장바구니에서 상품을 제거할 때, 해당 상품을 장바구니에서 삭제한다.
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

// 일반적인 비지니스 규칙: 장바구니에 상품을 추가할 때, 이미 추가된 상품인 경우 수량을 증가시킨다.
function addToCart(cart, product) {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    return changeProductQuantity(
      cart,
      product.id,
      cart[existingProductIndex].quantity + 1
    ); // 장바구니 기본 동작 함수 호출
  } else {
    return [...cart, { ...product, quantity: 1 }];
  }
}

// 장바구니 시스템
let cart = [];

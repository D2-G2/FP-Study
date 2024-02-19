// 다음 중첩된 동작을 카피-온-라이트 버전으로 만들어 보세요.
// const setQuantityByName = (cart, name, quantity) => {
//   for (let i = 0; i < cart.length; i++) {
//     if (cart[i].name === name) cart[i].quantity = quantity;
//   }
// };

const setQuantityByName = (cart, name, quantity) => {
  let copy = cart.slice();
  for (let i = 0; i < copy.length; i++) {
    if (copy[i].name === name) {
      copy[i] = objectSet(copy[i], "quantity", quantity);
    }
  }
};

const objectSet = (object, key, value) => {
  let copy_o = Object.assign({}, object);
  copy_o[key] = value;
  return copy_o;
};

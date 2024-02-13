// 카피-온-라이트 방식으로 객체에 값을 설정하는 objectSet() 함수를 만들어 보세요.
// o["price"] = 37;

const objectSet = (object, key, value) => {
  let copy_o = Object.assign({}, object);
  copy_o[key] = value;
  return copy_o;
};

const o = { a: 1, b: 2 };
console.log(objectSet(o, "c", 5));

// 방금 만든 objectSet() 함수를 사용해 setPrice()를 리팩터링 해보세요.
// const setPrice = (item, new_price) => {
//   var item_copy = Object.assign({}, item);
//   item_copy.price = new_price;
//   return item_copy;
// };

// objectSet() 을 사용해서 제품 가격을 설정하는 setPrice() 함수를 작성해 보시오.
// 카피-온-라이트 원칙을 지키면서 구현
// const setPrice = (item, new_price) => {
//   return objectSet(item, "price", new_price);
// };

/*
objectSet() 함수를 이용해 제품 개수를 설정하는 setQuantity() 함수를 만들어 보세요
카피-온-라이트 원칙을 지키는 것을 잊지 마세요
*/
const setQuantity = (item, new_quantity) => {
  return objectSet(item, "quantity", new_quantity);
};

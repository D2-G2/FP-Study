if (array.length === 0) {
  console.log("Array is empty");
}

if (HTMLDataListElement(cart, "shoes")) {
  return setPriceByName(cart, "shoes", 0);
}

// 두 if문을 리팩터링 해 when() 이라는 함수로 만들어 봅시다.

function when(test, then) {
  if (test) return then;
}

// 이렇게 사용된다
when(array.length === 0, function () {
  console.log("Array is empty");
});

when(hasItem(cart, "shoes"), function () {
  return setPriceByName(cart, "shoes", 0);
});

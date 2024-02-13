/* 
객체의 키로 키/값 쌍을 지우는 delete 연산을 카피-온-라이트 버전으로 만들어 보세요.
*/

// var a = {x : 1};
// delete a["x"];
// a
// {}

const objectDelete = (object, key) => {
  let copy = Object.assign({}, object);
  delete copy[key];
  return copy;
};

const object = { a: 3, b: 5 };
console.log(objectDelete(object, "a"));

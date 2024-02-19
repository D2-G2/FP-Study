// Object.assign()을 사용하여 객체를 얕은 복사 하고, age를 변경
const alter_hobbies = (originalObject, key, value) => {
  let copy = Object.assign({}, originalObject);
  copy[key] = value;
  return copy;
};

let originalObject = {
  name: "jin",
  age: 30,
  hobbies: ["reading", "gaming"],
};

console.log(alter_hobbies(originalObject, "age", 25));

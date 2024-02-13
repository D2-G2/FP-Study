const alter_hobbies = (originalObject, key, value) => {
  // deepCopy 함수
  const deepCopy = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    let newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }

    return newObj;
  };

  let copy = deepCopy(originalObject);
  copy.hobbies[key] = value;
  return copy;
};

let originalObject = {
  name: "jin",
  age: 30,
  hobbies: ["reading", "gaming"],
};

console.log(alter_hobbies(originalObject, 0, "cooking"));

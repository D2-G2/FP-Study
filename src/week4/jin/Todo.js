// const onInsert = useCallback(() => {
//   const todo = {
//     id: nextId.current,
//     text: inputText,
//     state: false,
//   };
//   setTodos(todos.concat(todo));
//   setInputText("");
//   nextId.current += 1;
// }, [inputText]);

const onInsert = useCallback(() => {
  setTodos((prevTodos) => {
    const todo = {
      id: nextId.current,
      text: inputText,
      state: false,
    };
    return [...prevTodos, todo];
  });
  setInputText("");
  nextId.current += 1;
}, [inputText]);

// concat() 메서드를 없애 추상화 단계를 맞춰줌

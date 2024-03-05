// 조지를 도와서 try/catch 함수를 만들자

// withLogging 함수
function withLogging(f) {
  try {
    f();
  } catch (error) {
    logToSnapErros(error);
  }
}

// 힌트: 정답은 withLogging 함수와 비슷하게 생겼다. 함수 인자 두개를 받는것이 다르다
function tryCatch(f, errorHandler) {
  try {
    f();
  } catch (error) {
    errorHandler(error);
  }
}

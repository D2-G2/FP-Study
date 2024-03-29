/*
MegaMart에는 사용자 데이터를 제공하는 또 다른 레거시 시스템이 있다.
이 시스템을 구독하면 사용자 정보가 바뀔 때마다 바뀐 사용자 정보를 알 수 있다.

구독하는 모든 코드는 같은 사용자 데이터를 전달받는다. 전달받은 사용자 데이터는 모두 참조
값으로 메모리에 같은 객체를 가리키고 있다. 그리고 사용자 데이터는 신뢰할 수 없는
코드로부터 온다. 방어적 복사로 사용자 데이터를 보호해 보자. 안전하지 않은 곳으로 나가는 데이터는 없다.
바뀔 수도 있는 사용자 데이터가 들어오기만 한다.
*/

userChanges.subscribe((user) => {
  let copy = deepCopy(user);
  // 여기에 방어적 복사를 구현
  processUser(user);
});

// 금액 계산
const calculateTotalAmount = (items: { menuId: string; quantity: number }[], menuData: Menu[]): number => {
  return items.reduce((total, item) => {
    const menu = menuData.find((menu) => menu.name === item.menuId);
    return total + (menu ? menu.price * item.quantity : 0);
  }, 0);
};

// 주문 가능 여부 검증
const verifyOrder = (order: Order, stockData: Stock[]): boolean => {
  return order.items.every((item) => {
    const stockItem = stockData.find((stock) => stock.menuId === item.menuId);
    return stockItem ? stockItem.quantity >= item.quantity : false;
  });
};

// 배달 시간 계산 (예시, 실제 계산은 더 복잡할 수 있음)
const calculateDeliveryTime = (order: Order, currentStatus: string): Date => {
  const currentTime = new Date();
  // 예상 시간 계산 로직 (단순화)
  currentTime.setHours(currentTime.getHours() + 1); // 단순히 현재 시간에 1시간 추가
  return currentTime;
};

// 로그인 유효성 검증
const verifyLogin = (loginInfo: LoginInfo, customerData: Customer[]): boolean => {
  const customer = customerData.find((customer) => customer.loginInfo.username === loginInfo.username);
  return customer ? customer.loginInfo.password === loginInfo.password : false;
};

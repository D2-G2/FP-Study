// 메뉴 데이터
type Menu = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

// 주문 데이터
type Order = {
  orderId: string;
  customerId: string;
  items: { menuId: string; quantity: number }[];
  orderTime: Date;
  paymentInfo: PaymentInfo;
  deliveryInfo: DeliveryInfo;
};

// 결제 정보
type PaymentInfo = {
  method: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
};

// 배달 정보
type DeliveryInfo = {
  address: string;
  estimatedDeliveryTime: Date;
  status: 'preparing' | 'delivering' | 'delivered';
};

// 고객 데이터
type Customer = {
  customerId: string;
  name: string;
  contact: string;
  address: string;
  loginInfo: LoginInfo;
};

// 로그인 정보
type LoginInfo = {
  username: string;
  password: string;
  hashed;
  status: 'loggedOut' | 'loggedIn';
};

// 재고 데이터
type Stock = {
  menuId: string;
  quantity: number;
};

// 라이더 데이터
type Rider = {
  riderId: string;
  name: string;
  status: 'waiting' | 'delivering';
};

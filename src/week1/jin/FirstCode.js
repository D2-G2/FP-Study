/* 
customer 데이터를 사용해서 주문 수량이 5개 이상인 손님들에게는 "배송비는 무료입니다." 메시지를,
5개 이하인 손님들에게는 "배송비는 2000원입니다." 라는 메시지를 보내고, 만약 주문 수량이 5개 미만이면서
country가 korea가 아닐 경우 배송비에 1000원을 추가해서 메시지를 보내는 코드를 작성해 봅시다.
*/

const customers = [
  {
    id: 1,
    name: "sam",
    number: "000-0000-0000",
    orderItem: "book",
    country: "korea",
    count: 3,
  },
  {
    id: 2,
    name: "jam",
    number: "111-1111-1111",
    orderItem: "apple",
    country: "korea",
    count: 10,
  },
  {
    id: 3,
    name: "pam",
    number: "222-2222-2222",
    orderItem: "bottle",
    country: "america",
    count: 4,
  },
  {
    id: 4,
    name: "tam",
    number: "333-3333-3333",
    orderItem: "orange",
    country: "japan",
    count: 2,
  },
  {
    id: 5,
    name: "ham",
    number: "444-4444-4444",
    orderItem: "flower",
    country: "korea",
    count: 6,
  },
];

const deliveryFee = 2000;
const additionalFee = 1000;

const deliveryMessages = (customers) => {
  customers.forEach((customer) => {
    let fee = 0;

    if (customer.count < 5) {
      fee += deliveryFee;
      if (customer.country !== "korea") {
        fee += additionalFee;
      }
    }

    payDeliveryMessage(fee);
  });
};

const payDeliveryMessage = (fee) => {
  if (fee === 0) {
    console.log("배송비는 무료입니다.");
  } else {
    console.log(`배송비는 ${fee}원입니다.`);
  }
};

deliveryMessages(customers);

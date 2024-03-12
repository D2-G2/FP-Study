function discount(price, membershipLevel) {
  const discountRates = { Silver: 0.05, Gold: 0.1, Platinum: 0.15 };
  const discountRate = discountRates[membershipLevel] || 0;
  return price * (1 - discountRate);
}

function applyPoints(price, pointsUsed) {
  return price - pointsUsed;
}

function addVAT(price) {
  const vatRate = 0.1;
  return price * (1 + vatRate);
}

function calculateShipping(price) {
  const freeShippingThreshold = 50000;
  const shippingFee = 3000;
  return price >= freeShippingThreshold ? price : price + shippingFee;
}

const pipeline =
  (...funcs) =>
  (input, ...args) =>
    funcs.reduce((acc, func) => func(acc, ...args), input);

const calculateFinalPrice = pipeline(applyMembershipDiscount, applyPoints, addVAT, calculateShipping);

const originalPrice = 45000;
const membershipLevel = 'Gold';
const pointsUsed = 5000;

console.log(calculateFinalPrice(originalPrice, membershipLevel, pointsUsed));

function isInCart(cart, name) {
  return indexOfItem(cart, name) !== null;
}

function indexOfItem(cart, name) {
  for (vari = 0; i < cart.lenght; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

/*
계층구조
                isInCart()
                    |
                indexOfItem()
                |          |
            for loop    array index
*/

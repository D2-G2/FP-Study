// function freeTieClip(cart) {
//   var hasTie = false;
//   var hasTieclip = false;
//   for (var i = 0; i < cart.length; i++) {
//     var item = cart[i];
//     if (item.name === "tie clip") {
//       hasTieclip = true;
//     }
//   }
//   if (hasTie && !hastieClip) {
//     var tieClip = make_item("tie clip", 0);
//     return add_item(cart, tieClip);
//   }
//   return cart;
// }

function addFreeTieClip(cart) {
  const hasTie = cart.some((item) => item.name === "tie");
  const hasTieclip = cart.some((item) => item.name === "tie clip");

  if (hasTie && !hasTieClip) {
    const tieClip = make_item("tie clip", 0);
    cart = add_item(cart, tieClip);
  }

  return cart;
}

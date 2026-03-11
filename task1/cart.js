function calculateCartTotal(items, discount = 0) {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array");
  }
  let total = 0;
  items.forEach(item => {
    if (!item.price || !item.quantity) {
      throw new Error("Invalid item");
    }
    total += item.price * item.quantity;
  });
  if (discount > 0) {
    total = total - (total * discount);
  }
  return Number(total.toFixed(2));
}
module.exports = { calculateCartTotal };

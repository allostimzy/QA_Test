const { calculateCartTotal } = require('./cart');

// THIS IS THE CORRECTED TEST - Please see README for explanation of why the original failed
test('calculates cart total correctly with 10% discount', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  // Subtotal: 10*2 + 5*3 = 20 + 15 = 35
  // With 10% discount: 35 - (35 * 0.1) = 35 - 3.5 = 31.5
  expect(calculateCartTotal(items, 0.1)).toBe(31.5);
});

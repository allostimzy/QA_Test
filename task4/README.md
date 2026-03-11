## Task 4: Debugging - Why the Test Fails

### Original failing test:

```javascript
test("calculates cart total correctly", () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  expect(calculateCartTotal(items, 0.1)).toBe(22.5);
});
```

### Explanation

The test fails because the **expected value is incorrect**. Let's trace through the calculation:

1. **Subtotal**: 
   - Item 1: 10 × 2 = 20
   - Item 2: 5 × 3 = 15
   - **Total before discount: 35**

2. **10% discount (0.1)**:
   - Discount amount: 35 × 0.1 = 3.5
   - **Total after discount: 35 - 3.5 = 31.5**

The test expects `22.5`, but the correct result is `31.5`. There is no mathematical path that would produce 22.5 from these inputs, it appears to be a miscalculation or typo in the expected value.

### Corrected test:

```javascript
test('calculates cart total correctly with 10% discount', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  // Subtotal: 10*2 + 5*3 = 20 + 15 = 35
  // With 10% discount: 35 - (35 * 0.1) = 35 - 3.5 = 31.5
  expect(calculateCartTotal(items, 0.1)).toBe(31.5); 
});
```

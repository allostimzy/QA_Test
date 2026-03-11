const { calculateCartTotal } = require('./cart');

describe('calculateCartTotal', () => {
  describe('normal calculations', () => {
    test('calculates total for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 }
      ];
      expect(calculateCartTotal(items)).toBe(35);
    });

    test('calculates total for single item', () => {
      const items = [{ price: 25, quantity: 2 }];
      expect(calculateCartTotal(items)).toBe(50);
    });

    test('handles decimal prices correctly', () => {
      const items = [{ price: 9.99, quantity: 2 }];
      expect(calculateCartTotal(items)).toBe(19.98);
    });

    test('returns number with max 2 decimal places', () => {
      const items = [{ price: 10, quantity: 3 }];
      const result = calculateCartTotal(items);
      expect(result).toBe(30);
      expect(typeof result).toBe('number');
    });
  });

  describe('discounts', () => {
    test('applies 10% discount correctly', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 }
      ];
      expect(calculateCartTotal(items, 0.1)).toBe(31.5);
    });

    test('applies 50% discount correctly', () => {
      const items = [{ price: 100, quantity: 1 }];
      expect(calculateCartTotal(items, 0.5)).toBe(50);
    });

    test('applies no discount when discount is 0', () => {
      const items = [{ price: 10, quantity: 5 }];
      expect(calculateCartTotal(items, 0)).toBe(50);
    });

    test('handles discount with floating point precision', () => {
      const items = [{ price: 33.33, quantity: 3 }];
      expect(calculateCartTotal(items, 0.15)).toBe(84.99);
    });
  });

  describe('edge cases', () => {
    test('returns 0 for empty cart', () => {
      const items = [];
      expect(calculateCartTotal(items)).toBe(0);
    });

    test('empty cart with discount still returns 0', () => {
      const items = [];
      expect(calculateCartTotal(items, 0.2)).toBe(0);
    });

  });

  describe('error handling', () => {
    test('throws when items is not an array', () => {
      expect(() => calculateCartTotal(null)).toThrow('Items must be an array');
      expect(() => calculateCartTotal(undefined)).toThrow('Items must be an array');
      expect(() => calculateCartTotal('not array')).toThrow('Items must be an array');
      expect(() => calculateCartTotal(123)).toThrow('Items must be an array');
    });

    test('throws when item has no price', () => {
      const items = [{ quantity: 2 }];
      expect(() => calculateCartTotal(items)).toThrow('Invalid item');
    });

    test('throws when item has no quantity', () => {
      const items = [{ price: 10 }];
      expect(() => calculateCartTotal(items)).toThrow('Invalid item');
    });

    test('throws when item has price 0 (falsy)', () => {
      const items = [{ price: 0, quantity: 2 }];
      expect(() => calculateCartTotal(items)).toThrow('Invalid item');
    });

    test('throws when item has quantity of 0 (falsy)', () => {
      const items = [{ price: 10, quantity: 0 }];
      expect(() => calculateCartTotal(items)).toThrow('Invalid item');
    });
  });
});

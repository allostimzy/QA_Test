const { getUserData } = require('./userService');

describe('getUserData', () => {
  describe('successful API responses', () => {
    test('returns user data when API responds successfully', async () => {
      const mockUserData = {
        id: '123',
        name: 'Timothy Omamegbe',
        email: 'timothyomamegbe@gmail.com'
      };

      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      });

      const result = await getUserData(mockFetch, '123');

      expect(result).toEqual(mockUserData);
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users/123');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    test('calls correct API URL with userId', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: '456' })
      });

      await getUserData(mockFetch, '456');

      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users/456');
    });

    test('handles empty user object response', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({})
      });

      const result = await getUserData(mockFetch, '789');
      expect(result).toEqual({});
    });
  });

  describe('failed API responses', () => {
    test('throws when response is not ok (404)', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(getUserData(mockFetch, '123')).rejects.toThrow('Failed to fetch user');
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users/123');
    });

    test('throws when response is not ok (500)', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      await expect(getUserData(mockFetch, '123')).rejects.toThrow('Failed to fetch user');
    });

    test('throws when fetch rejects with network error', async () => {
      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getUserData(mockFetch, '123')).rejects.toThrow('Network error');
    });
  });

  describe('invalid inputs', () => {
    test('throws when userId is missing (undefined)', async () => {
      const mockFetch = jest.fn();

      await expect(getUserData(mockFetch, undefined)).rejects.toThrow('User ID required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test('throws when userId is null', async () => {
      const mockFetch = jest.fn();

      await expect(getUserData(mockFetch, null)).rejects.toThrow('User ID required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test('throws when userId is empty string', async () => {
      const mockFetch = jest.fn();

      await expect(getUserData(mockFetch, '')).rejects.toThrow('User ID required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test('accepts numeric userId (coerced to string in URL)', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 999 })
      });

      const result = await getUserData(mockFetch, 999);
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users/999');
      expect(result).toEqual({ id: 999 });
    });
  });
});

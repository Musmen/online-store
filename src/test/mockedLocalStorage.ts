type mockStorageType = { [key: string]: string };
let mockedStorage: mockStorageType = {};

export const mockedLocalStorage = {
  setItem: jest.fn((key: string, value: string) => {
    mockedStorage[key] = value;
  }),
  getItem: jest.fn((key: string) => mockedStorage[key] || ''),
  removeItem: jest.fn((key: string) => delete mockedStorage[key]),
  length: 0,
  clear: jest.fn(() => (mockedStorage = {})),
  key: jest.fn(() => ''),
};

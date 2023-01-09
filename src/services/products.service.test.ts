import testProductService from './products.service';

import { ProductItem } from '../models/product-item.model';
import { Category } from '../models/common.model';

import { MockedStorage, mockedStorage } from '../test/mockedStorage';
import {
  mockedFullProducts,
  mockedProductsOnlyWithNumericProperties,
  mockedSelectedProducts,
} from '../test/mockedProducts';
import { testMixedCategoriesList, testNationCategoriesList, testTypeCategoriesList } from '../test/mockedCategories';

describe('Testing productsService from "src/services/products.service.ts"', () => {
  test('Correctly creates ProductsService instance with all methods', () => {
    expect(testProductService).toBeDefined();
    expect(testProductService.findProductById).toBeDefined();
    expect(testProductService.getAllProducts).toBeDefined();
    expect(testProductService.setCurrentProduct).toBeDefined();
    expect(testProductService.getCurrentProduct).toBeDefined();
    expect(testProductService.updateCurrentProduct).toBeDefined();
    expect(testProductService.getSelectedProducts).toBeDefined();
    expect(testProductService.getSelectedProductsAmount).toBeDefined();
    expect(testProductService.setSelectedProducts).toBeDefined();
    expect(testProductService.getFilteredProducts).toBeDefined();
    expect(testProductService.getSortedProducts).toBeDefined();
    expect(testProductService.updateSelectedProducts).toBeDefined();
    expect(testProductService.countCategoryItemsInProducts).toBeDefined();
    expect(testProductService.getCategoryItemsCount).toBeDefined();
  });

  const getAllProductsOriginal = testProductService.getAllProducts;

  beforeEach(() => {
    testProductService.getAllProducts = () => mockedFullProducts;
  });

  describe('Testing findProductById method', () => {
    test('Correctly find product by id', () => {
      mockedFullProducts.forEach((mockedFullProduct: ProductItem) => {
        expect(testProductService.findProductById(String(mockedFullProduct.id))).toEqual(mockedFullProduct);
      });
    });

    test('Returns falsy/undefined if product not found by id', () => {
      expect(testProductService.findProductById('not id...')).toBeFalsy();
      expect(testProductService.findProductById('not id...')).toBeUndefined();
    });
  });

  describe('Testing updateCurrentProduct method', () => {
    const setCurrentProductOriginal = testProductService.setCurrentProduct;

    test('Correctly calls setCurrentProduct method for each self call', () => {
      const setCurrentProduct = jest.fn();
      testProductService.setCurrentProduct = setCurrentProduct;

      mockedFullProducts.forEach((mockedFullProduct: ProductItem) => {
        testProductService.updateCurrentProduct(String(mockedFullProduct.id));
      });
      expect(testProductService.setCurrentProduct).toBeCalledTimes(mockedFullProducts.length);
    });

    test('Correctly set current product to the storage', () => {
      const storage: MockedStorage = { ...mockedStorage };
      testProductService.setCurrentProduct = storage.setCurrentProduct.bind(storage);

      mockedFullProducts.forEach((mockedFullProduct: ProductItem) => {
        testProductService.setCurrentProduct(mockedFullProduct);
        expect(storage.currentProduct).toEqual({ ...mockedFullProduct });
      });
    });

    test('Sets to null if the product is not found', () => {
      const storage: MockedStorage = { ...mockedStorage };
      testProductService.setCurrentProduct = storage.setCurrentProduct.bind(storage);

      testProductService.setCurrentProduct(null);
      expect(storage.currentProduct).toBeNull();
    });

    testProductService.setCurrentProduct = setCurrentProductOriginal;
  });

  describe('Testing getSelectedProductsAmount method', () => {
    const setSelectedProductsOriginal = testProductService.setSelectedProducts;
    const getSelectedProductsOriginal = testProductService.getSelectedProducts;

    test('Correctly calls getSelectedProducts method for each self call', () => {
      const getSelectedProducts = jest.fn(() => []);
      testProductService.getSelectedProducts = getSelectedProducts;

      testProductService.getSelectedProductsAmount();
      testProductService.getSelectedProductsAmount();
      testProductService.getSelectedProductsAmount();

      expect(testProductService.getSelectedProducts).toBeCalledTimes(3);
    });

    test('Correctly get selected products amount from storage', () => {
      const storage: MockedStorage = { ...mockedStorage };
      testProductService.getSelectedProducts = storage.getSelectedProducts.bind(storage);
      testProductService.setSelectedProducts = storage.setSelectedProducts.bind(storage);

      expect(testProductService.getSelectedProductsAmount()).toBe(0);

      testProductService.setSelectedProducts(mockedProductsOnlyWithNumericProperties);
      expect(testProductService.getSelectedProductsAmount()).toBe(mockedProductsOnlyWithNumericProperties.length);

      testProductService.setSelectedProducts(mockedFullProducts);
      expect(testProductService.getSelectedProductsAmount()).toBe(mockedFullProducts.length);
    });

    testProductService.getSelectedProducts = getSelectedProductsOriginal;
    testProductService.setSelectedProducts = setSelectedProductsOriginal;
  });

  describe('Testing countCategoryItemsInProducts method', () => {
    test('Correctly count type category in products', () => {
      const testExpectedResultsList = [0, 2, 1, 0, 2];

      testTypeCategoriesList.forEach((testCategory: Category, index: number) => {
        expect(testProductService.countCategoryItemsInProducts(testCategory, mockedFullProducts)).toBe(
          testExpectedResultsList[index]
        );
      });
    });

    test('Correctly count nation category in products', () => {
      const testExpectedResultsList = [0, 0, 2, 0, 3];

      testNationCategoriesList.forEach((testCategory: Category, index: number) => {
        expect(testProductService.countCategoryItemsInProducts(testCategory, mockedFullProducts)).toBe(
          testExpectedResultsList[index]
        );
      });
    });

    test('Correctly mixed count categories in products', () => {
      const testExpectedResultsList = [0, 2, 1, 3, 1, 0, 1];

      testMixedCategoriesList.forEach((testCategory: Category, index: number) => {
        expect(testProductService.countCategoryItemsInProducts(testCategory, mockedFullProducts)).toBe(
          testExpectedResultsList[index]
        );
      });
    });
  });

  describe('Testing getCategoryItemsCount method', () => {
    const getSelectedProductsOriginal = testProductService.getSelectedProducts;

    beforeEach(() => {
      testProductService.getSelectedProducts = () => mockedSelectedProducts;
    });

    test('Correctly count type category in all and in selected products', () => {
      const testExpectedResultsList = [
        { total: 0, current: 0 },
        { total: 2, current: 2 },
        { total: 1, current: 1 },
        { total: 0, current: 0 },
        { total: 2, current: 0 },
      ];

      testTypeCategoriesList.forEach((testCategory: Category, index: number) => {
        expect(testProductService.getCategoryItemsCount(testCategory)).toEqual(testExpectedResultsList[index]);
      });
    });

    test('Correctly count nation category in all and in selected products', () => {
      const testExpectedResultsList = [
        { total: 0, current: 0 },
        { total: 0, current: 0 },
        { total: 2, current: 1 },
        { total: 0, current: 0 },
        { total: 3, current: 2 },
      ];

      testNationCategoriesList.forEach((testCategory: Category, index: number) => {
        expect(testProductService.getCategoryItemsCount(testCategory)).toEqual(testExpectedResultsList[index]);
      });
    });

    test('Correctly count mixed category in all and in selected products', () => {
      const testExpectedResultsList = [
        { total: 0, current: 0 },
        { total: 2, current: 2 },
        { total: 1, current: 1 },
        { total: 3, current: 2 },
        { total: 1, current: 0 },
        { total: 0, current: 0 },
        { total: 1, current: 1 },
      ];

      testMixedCategoriesList.forEach((testCategory: Category, index: number) => {
        expect(testProductService.getCategoryItemsCount(testCategory)).toEqual(testExpectedResultsList[index]);
      });
    });

    afterEach(() => {
      testProductService.getSelectedProducts = getSelectedProductsOriginal;
    });
  });

  afterEach(() => {
    testProductService.getAllProducts = getAllProductsOriginal;
  });
});

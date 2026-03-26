import { renderHook, waitFor } from '@testing-library/react';
import { useProducts, useFilteredProducts } from '../../hooks/useProducts';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('useProducts Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products and categories on mount', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        description: 'Test',
        category: 'electronics',
        image: 'url',
      },
    ];

    const mockCategories = ['electronics', 'jewelery'];

    jest.spyOn(api.apiService, 'getAllProducts').mockResolvedValue(mockProducts);
    jest.spyOn(api.apiService, 'getCategories').mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('API Error');
    jest.spyOn(api.apiService, 'getAllProducts').mockRejectedValue(mockError);
    jest.spyOn(api.apiService, 'getCategories').mockRejectedValue(mockError);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.products).toHaveLength(2);
    expect(result.current.categories).toEqual([]);
  });
});

describe('useFilteredProducts Hook', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Laptop',
      price: 100,
      description: 'High performance laptop',
      category: 'electronics',
      image: 'url',
    },
    {
      id: 2,
      title: 'Phone',
      price: 50,
      description: 'Smartphone',
      category: 'electronics',
      image: 'url',
    },
    {
      id: 3,
      title: 'Ring',
      price: 200,
      description: 'Gold ring',
      category: 'jewelery',
      image: 'url',
    },
  ];

  it('should filter products by search term', () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, 'Laptop', null, 'none')
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('Laptop');
  });

  it('should filter products by category', () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, '', 'jewelery', 'none')
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].category).toBe('jewelery');
  });

  it('should sort products by price ascending', () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, '', null, 'asc')
    );

    expect(result.current[0].price).toBe(50);
    expect(result.current[1].price).toBe(100);
    expect(result.current[2].price).toBe(200);
  });

  it('should sort products by price descending', () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, '', null, 'desc')
    );

    expect(result.current[0].price).toBe(200);
    expect(result.current[1].price).toBe(100);
    expect(result.current[2].price).toBe(50);
  });

  it('should apply multiple filters simultaneously', () => {
    const { result } = renderHook(() =>
      useFilteredProducts(mockProducts, 'phone', 'electronics', 'asc')
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('Phone');
  });
});

import { Dispatch } from 'redux';
import { api } from '../services/api';
import { Product, Category } from '../types';
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_LOW_STOCK_SUCCESS,
} from './actionTypes';

export const fetchProducts = (params?: Record<string, any>) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  try {
    let url = '/catalog/products';
    if (params) {
      const queryParams = new URLSearchParams();

      // Map params to API parameters
      if (params.page !== undefined) queryParams.append('page', String(params.page));
      if (params.size !== undefined) queryParams.append('size', String(params.size));
      if (params.q) queryParams.append('q', params.q);
      if (params.categoryId) queryParams.append('categoryId', params.categoryId);
      if (params.socket) queryParams.append('socket', params.socket);
      if (params.minPower !== undefined) queryParams.append('minPower', String(params.minPower));
      if (params.maxPower !== undefined) queryParams.append('maxPower', String(params.maxPower));
      if (params.minBrightness !== undefined) queryParams.append('minBrightness', String(params.minBrightness));
      if (params.maxBrightness !== undefined) queryParams.append('maxBrightness', String(params.maxBrightness));
      if (params.colorTemperature !== undefined) queryParams.append('colorTemperature', String(params.colorTemperature));
      if (params.shape) queryParams.append('shape', params.shape);
      if (params.minPrice !== undefined) queryParams.append('minPrice', String(params.minPrice));
      if (params.maxPrice !== undefined) queryParams.append('maxPrice', String(params.maxPrice));
      if (params.sort) queryParams.append('sort', params.sort);

      const queryString = queryParams.toString();
      if (queryString) {
        url = `/catalog/products/search?${queryString}`;
      }
    }
    const response = await api.get<Product[]>(url);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response });
    return response;
  } catch (error: any) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    throw error;
  }
};

export const fetchProduct = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  try {
    const response = await api.get<Product>(`/catalog/products/${id}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response });
    return response;
  } catch (error: any) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    throw error;
  }
};

export const fetchLowStock = (threshold: number = 10) => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<Product[]>(`/catalog/products/low-stock?threshold=${threshold}`);
    dispatch({ type: FETCH_LOW_STOCK_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCategories = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<Category[]>(`/catalog/categories`);
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProduct = (product: Partial<Product>) => async () => {
  try {
    return await api.post<Product>('/catalog/products', product);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = (id: string, product: Partial<Product>) => async () => {
  try {
    return await api.patch<Product>(`/catalog/products/${id}`, product);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = (id: string) => async () => {
  try {
    return await api.delete(`/catalog/products/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductStock = (id: string, quantity: number) => async () => {
  try {
    return await api.patch(`/catalog/products/${id}/stock`, { quantity });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategory = (category: Partial<Category>) => async () => {
  try {
    return await api.post<Category>('/catalog/categories', category);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategory = (id: string, category: Partial<Category>) => async () => {
  try {
    return await api.patch<Category>(`/catalog/categories/${id}`, category);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategory = (id: string) => async () => {
  try {
    return await api.delete(`/catalog/categories/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { Dispatch } from 'redux';
import { catalogApi as api } from '../services/api';
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

      const appendParam = (key: string, value: any) => {
        if (value === undefined || value === null || value === '') return;
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      };

      appendParam('page', params.page);
      appendParam('size', params.size);
      appendParam('q', params.q);
      appendParam('categoryId', params.categoryId);
      appendParam('socket', params.socket);
      appendParam('minPower', params.minPower);
      appendParam('maxPower', params.maxPower);
      appendParam('minBrightness', params.minBrightness);
      appendParam('maxBrightness', params.maxBrightness);
      appendParam('colorTemperature', params.colorTemperature);
      appendParam('shape', params.shape);
      appendParam('minPrice', params.minPrice);
      appendParam('maxPrice', params.maxPrice);
      appendParam('sort', params.sort);

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

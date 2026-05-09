import { Dispatch } from 'redux';
import { ordersApi as api } from '../services/api';
import { Order, ReferenceData } from '../types';
import {
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CREATE_ORDER_SUCCESS,
  FETCH_ORDER_STATUSES_SUCCESS,
  FETCH_DELIVERY_TYPES_SUCCESS,
} from './actionTypes';

export const fetchOrders = (params?: Record<string, any>) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ORDERS_START });
  try {
    let url = '/orders';
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== 'all') {
          queryParams.append(key, params[key]);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    const response = await api.get<Order[]>(url);
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response });
    return response;
  } catch (error: any) {
    dispatch({ type: FETCH_ORDERS_FAILURE, payload: error.message });
    throw error;
  }
};

export const fetchOrderStatuses = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<ReferenceData[]>('/orders/statuses');
    dispatch({ type: FETCH_ORDER_STATUSES_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDeliveryTypes = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<ReferenceData[]>('/orders/delivery-types');
    dispatch({ type: FETCH_DELIVERY_TYPES_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrder = (orderData: any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post<Order>('/orders', orderData);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

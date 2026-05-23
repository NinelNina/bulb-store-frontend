import { Order, ReferenceData } from '../types';
import {
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CREATE_ORDER_SUCCESS,
  FETCH_ORDER_STATUSES_SUCCESS,
  FETCH_ORDER_PAYMENT_STATUSES_SUCCESS,
  FETCH_DELIVERY_TYPES_SUCCESS,
} from './actionTypes';

export interface OrdersState {
  items: Order[];
  statuses: ReferenceData[];
  paymentStatuses: ReferenceData[];
  deliveryTypes: ReferenceData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  statuses: [],
  paymentStatuses: [],
  deliveryTypes: [],
  status: 'idle',
  error: null,
};

export const orderReducer = (state = initialState, action: any): OrdersState => {
  switch (action.type) {
    case FETCH_ORDERS_START:
      return { ...state, status: 'loading' };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, status: 'succeeded', items: action.payload };
    case FETCH_ORDER_STATUSES_SUCCESS:
      return { ...state, statuses: action.payload };
    case FETCH_ORDER_PAYMENT_STATUSES_SUCCESS:
      return { ...state, paymentStatuses: action.payload };
    case FETCH_DELIVERY_TYPES_SUCCESS:
      return { ...state, deliveryTypes: action.payload };
    case FETCH_ORDERS_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    case CREATE_ORDER_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

import { Product, Category } from '../types';
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_LOW_STOCK_SUCCESS,
} from './actionTypes';

export interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  lowStockItems: Product[];
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  ratings: Record<string, { rating: number, reviewsCount: number }>;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  lowStockItems: [],
  categories: [],
  status: 'idle',
  error: null,
  ratings: {},
};

export const productReducer = (state = initialState, action: any): ProductsState => {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return { ...state, status: 'loading' };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, status: 'succeeded', items: action.payload.items || action.payload, ratings: action.payload.ratings || state.ratings };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, status: 'succeeded', currentProduct: action.payload };
    case 'UPDATE_RATINGS':
      return { ...state, ratings: { ...state.ratings, ...action.payload } };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    case FETCH_LOW_STOCK_SUCCESS:
      return { ...state, lowStockItems: action.payload };
    default:
      return state;
  }
};

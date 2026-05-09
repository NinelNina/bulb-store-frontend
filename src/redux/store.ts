import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartReducer';
import { productReducer } from './productReducer';
import { orderReducer } from './orderReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

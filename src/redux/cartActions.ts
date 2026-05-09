import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART } from './actionTypes';
import { CartItem } from './cartReducer';

export const addToCart = (product: Omit<CartItem, 'quantity'>) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id: string) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const updateQuantity = ({ id, quantity }: { id: string; quantity: number }) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../redux/cartActions';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    addToCart: (product: Omit<CartItem, 'quantity'>) => dispatch(addToCart(product)),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    updateQuantity: (id: string, quantity: number) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    totalItems,
    totalPrice
  };
}


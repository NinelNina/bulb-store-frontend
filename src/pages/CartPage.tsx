import { 
  Box, Typography, Grid, Paper, Snackbar, Alert, Button
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../components/CartItem/CartItem";
import { CartSummary } from "../components/CartSummary/CartSummary";
import { useAppDispatch } from "../redux/hooks";
import { createOrder } from "../redux/orderActions";
import styles from './CartPage.module.css';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [lastOrder, setLastOrder] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = (data: { client: string; phone: string; deliveryService: string; address?: string }) => {
    const deliveryMap: Record<string, number> = {
      'cdek': 1,
      'post': 3,
      'msk': 5
    };

    const orderData = {
      phone_number: data.phone,
      user_full_name: data.client,
      delivery_type_id: deliveryMap[data.deliveryService] || 1,
      delivery_address: data.address || "",
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    };

    dispatch(createOrder(orderData))
      .then((res: any) => {
        const orderNumber = res.order_number;
        setLastOrder(orderNumber);
        localStorage.setItem("last_order_number", orderNumber);
        clearCart();
      })
      .catch((err: any) => {
        setErrorMsg("Ошибка при оформлении заказа. " + (err.message || ""));
      });
  };

  if (lastOrder) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 6, borderRadius: 3, border: 1, borderColor: 'success.light', bgcolor: 'success.900' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>🎉</Typography>
          <Typography variant="h4" className="bold" gutterBottom>
            Заказ успешно оформлен!
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>
            Номер вашего заказа: {lastOrder}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            Мы уже начали собирать вашу посылку. Вы можете отследить статус заказа в разделе "Отслеживание" по его номеру.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" size="large" onClick={() => navigate("/")}>
              В каталог
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate("/track")}>
              Отследить статус
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom className="section-title">
        Корзина
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeFromCart} 
              />
            ))}
            {items.length === 0 && (
              <Paper elevation={0} className={`${styles.cartEmptyState}`}>
                <Typography color="text.secondary">Ваша корзина пока пуста.</Typography>
              </Paper>
            )}
          </Box>
        </Grid>

        {/* Checkout Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CartSummary count={totalItems} sum={totalPrice} disabled={items.length === 0} onCheckout={handleCheckout} />
        </Grid>
      </Grid>
      
      <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={() => setErrorMsg("")}>
        <Alert severity="error" sx={{ width: '100%' }}>{errorMsg}</Alert>
      </Snackbar>
    </Box>
  );
}


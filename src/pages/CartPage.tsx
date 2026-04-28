import {
  Box, Typography, Grid, Paper
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { CartItem } from "../components/CartItem/CartItem";
import { CartSummary } from "../components/CartSummary/CartSummary";

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

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
                  <Paper elevation={0} className="cart-empty-state">
                    <Typography color="text.secondary">Ваша корзина пока пуста.</Typography>
                  </Paper>
              )}
            </Box>
          </Grid>

          {/* Checkout Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CartSummary count={totalItems} sum={totalPrice} disabled={items.length === 0} />
          </Grid>
        </Grid>
      </Box>
  );
}


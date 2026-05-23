import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Paper, Divider, InputAdornment, Grid, CircularProgress, Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../services/api";

const orderStates: Record<number, string> = {
  1: 'Обрабатывается',
  2: 'В пути',
  3: 'Доставлено на объект',
  4: 'Получено клиентом',
  5: 'Отклонено'
};

const paymentStates: Record<number, string> = {
  1: 'Ожидает оплаты',
  2: 'Оплачено',
  3: 'Возврат',
  4: 'Отменено'
};

export function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedOrder = localStorage.getItem("last_order_number");
    if (savedOrder) {
      setOrderQuery(savedOrder);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // The backend expects orderNumber or phoneNumber
      // We try searching as orderNumber first
      const data = await api.get<any>(`/orders/tracking?orderNumber=${orderQuery}`);
      setOrder(data);
    } catch (err: any) {
      setError("Заказ не найден. Проверьте правильность номера.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{ maxWidth: 800, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Отслеживание заказа
          </Typography>
          <Typography color="text.secondary">
            Введите номер заказа (например, ORD-0001) для проверки статуса.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
          <TextField
              fullWidth
              placeholder="ORD-0001"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                  ),
                },
              }}
              sx={{ bgcolor: 'white' }}
          />
          <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ px: 4, minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Найти"}
          </Button>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {order && (
            <Paper elevation={0} sx={{ borderRadius: 3, border: 1, borderColor: 'grey.200', overflow: 'hidden' }}>
              <Box sx={{ p: 4, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'grey.200' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Заказ #{order.order_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Создан: {new Date(order.created_at).toLocaleDateString()} | Оплата: <Typography component="span" color={order.payment_state_id === 2 ? "success.main" : "warning.main"} sx={{ fontWeight: 'medium' }}>
                  {paymentStates[order.payment_state_id]}
                </Typography>
                </Typography>

                <Box sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: 1, color: '#b45309', bgcolor: '#fef3c7', px: 2, py: 1, borderRadius: 2, border: 1, borderColor: '#fde68a' }}>
                  <Typography component="span" sx={{ fontSize: 20 }}>📦</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{orderStates[order.order_state_id]}</Typography>
                </Box>
              </Box>

              <Box sx={{ p: 4 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Детали доставки
                </Typography>
                <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', border: 1, borderColor: 'grey.100', mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 12 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Адрес доставки</Typography>
                      <Typography sx={{ fontWeight: 'medium' }}>{order.delivery_address}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Клиент</Typography>
                      <Typography sx={{ fontWeight: 'medium' }}>{order.user_full_name}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Сумма к оплате</Typography>
                      <Typography sx={{ fontWeight: 'medium' }}>{Number(order.total_amount).toLocaleString()} ₽</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Возникли вопросы?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Если у вас есть вопросы по заказу, пожалуйста, свяжитесь с нами по телефону или напишите в чат.
                </Typography>
                <Button variant="outlined" component="a" href={`tel:${order.phone_number}`}>
                  Позвонить менеджеру
                </Button>
              </Box>
            </Paper>
        )}
      </Box>
  );
}

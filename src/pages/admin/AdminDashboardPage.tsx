import { 
  Box, Typography, Grid, CircularProgress
} from "@mui/material";
import { useEffect } from "react";
import { StatCard } from "../../components/StatCard/StatCard";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOrders } from "../../redux/orderActions";
import { fetchLowStock } from "../../redux/productActions";

export function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.items);
  const status = useAppSelector(state => state.orders.status);
  const lowStock = useAppSelector(state => state.products.lowStockItems);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
    dispatch(fetchLowStock(10));
  }, [status, dispatch]);

  return (
    <Box className="flex-column" sx={{ gap: 4 }}>
      <Typography variant="h5" className="bold">
        Обзор магазина
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Всего заказов" 
            value={orders.length.toString()} 
            subtitle="За все время" 
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Выручка (₽)" 
            value={orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0).toLocaleString()} 
            subtitle="Оплата при получении" 
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Новые заказы" 
            value={orders.filter(o => o.order_state_id === 1).length.toString()} 
            valueColor="error.main" 
            subtitle="Требуют обработки" 
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard 
            title="Остатки < 10 шт" 
            value={`${lowStock.length} позиций`} 
            subtitle="Пополнить склад" 
            subtitleColor="primary.main" 
            onClick={() => {}} 
          />
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h6" className="bold" sx={{ mb: 2 }}>
          Последние заказы
        </Typography>
        {status === 'loading' ? (
          <CircularProgress />
        ) : (
          <OrdersTable orders={orders.slice(0, 5)} />
        )}
      </Box>
    </Box>
  );
}



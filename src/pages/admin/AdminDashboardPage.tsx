import {
  Box, Typography, Grid, CircularProgress
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { StatCard } from "../../components/StatCard/StatCard";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOrders, fetchOrderStatuses, fetchPaymentStatuses } from "../../redux/orderActions";
import { fetchLowStock } from "../../redux/productActions";
// import { fetchPreorders } from "../../redux/adminActions";

export function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.items);
  const status = useAppSelector(state => state.orders.status);
  const statuses = useAppSelector(state => state.orders.statuses);
  const paymentStatuses = useAppSelector(state => state.orders.paymentStatuses);
  const lowStock = useAppSelector(state => state.products.lowStockItems);
  // const preorders = useAppSelector(state => state.admin.preorders);

  useEffect(() => {
    // Today's date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    dispatch(fetchOrders()); // Generic fetch for the table
    dispatch(fetchOrderStatuses() as any);
    dispatch(fetchPaymentStatuses() as any);
    dispatch(fetchOrders({ createdAt: today })); // Re-fetch might overwrite items in current simple reducer,
    // maybe we should just filter on client for now or add a separate state.
    // Given the constraints, let's just use what we have and maybe filter.

    dispatch(fetchLowStock(10));
    // dispatch(fetchPreorders({ statusId: 1 }));
  }, [dispatch]);

  const todayOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(o => o.created_at?.startsWith(today));
  }, [orders]);

  const revenue = useMemo(() =>
          orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0),
      [orders]);

  return (
      <Box className="flex-column" sx={{ gap: 4 }}>
        <Typography variant="h5" className="bold">
          Панель управления
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
                title="Заказов сегодня"
                value={todayOrders.length.toString()}
                subtitle="Актуальные данные"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
                title="Выручка (₽)"
                value={revenue.toLocaleString()}
                subtitle="За все время"
            />
          </Grid>
          {/*<Grid size={{ xs: 12, sm: 6, md: 3 }}>*/}
          {/*  <StatCard*/}
          {/*      title="Новые заявки"*/}
          {/*      value={preorders.length.toString()}*/}
          {/*      valueColor={preorders.length > 0 ? "error.main" : "text.primary"}*/}
          {/*      subtitle="Требуют звонка"*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
                title="Критический остаток"
                value={`${lowStock.length} поз.`}
                valueColor={lowStock.length > 0 ? "error.main" : "text.primary"}
                subtitle="Менее 10 шт. на складе"
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
              <OrdersTable
                  orders={orders.slice(0, 5)}
                  orderStatuses={statuses}
                  paymentStatuses={paymentStatuses}
              />
          )}
        </Box>
      </Box>
  );
}



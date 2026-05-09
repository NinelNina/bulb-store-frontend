import { Box, Typography, CircularProgress } from "@mui/material";
import { OrdersFilterBar } from "../../components/OrdersFilterBar/OrdersFilterBar";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOrders, fetchOrderStatuses } from "../../redux/orderActions";
import { useEffect } from "react";

export function AdminOrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.items);
  const statuses = useAppSelector(state => state.orders.statuses);
  const status = useAppSelector(state => state.orders.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
      dispatch(fetchOrderStatuses());
    }
  }, [status, dispatch]);

  const handleFilter = (filters: any) => {
    dispatch(fetchOrders(filters));
  };

  return (
    <Box className="flex-column" sx={{ gap: 4 }}>
      <Typography variant="h5" className="bold">Управление заказами</Typography>
      <OrdersFilterBar statuses={statuses} onFilter={handleFilter} />
      {status === 'loading' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <OrdersTable orders={orders} showDetails />
      )}
    </Box>
  );
}


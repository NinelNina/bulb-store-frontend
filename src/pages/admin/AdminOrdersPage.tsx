import { Box, Typography, CircularProgress } from "@mui/material";
import { OrdersFilterBar } from "../../components/OrdersFilterBar/OrdersFilterBar";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOrders, fetchOrderStatuses, fetchPaymentStatuses,
  updateOrderStatus, updateOrderPayment
} from "../../redux/orderActions";
import { useEffect } from "react";

export function AdminOrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.orders.items);
  const statuses = useAppSelector(state => state.orders.statuses);
  const paymentStatuses = useAppSelector(state => state.orders.paymentStatuses);
  const status = useAppSelector(state => state.orders.status);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchOrderStatuses());
    dispatch(fetchPaymentStatuses());
  }, [dispatch]);

  const handleFilter = (filters: any) => {
    dispatch(fetchOrders(filters));
  };

  const handleStatusChange = async (orderId: string, statusId: number) => {
    try {
      await dispatch(updateOrderStatus(orderId, statusId) as any);
      dispatch(fetchOrders());
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentChange = async (orderId: string, paymentStatusId: number) => {
    try {
      await dispatch(updateOrderPayment(orderId, paymentStatusId) as any);
      dispatch(fetchOrders());
    } catch (err) {
      console.error(err);
    }
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
            <OrdersTable
                orders={orders}
                showDetails
                orderStatuses={statuses}
                paymentStatuses={paymentStatuses}
                onStatusChange={handleStatusChange}
                onPaymentChange={handlePaymentChange}
            />
        )}
      </Box>
  );
}


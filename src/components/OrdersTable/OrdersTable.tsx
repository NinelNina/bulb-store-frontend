import { 
  Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Button, Box
} from "@mui/material";
import styles from './OrdersTable.module.css';
import { Order } from "../../types";

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

interface OrdersTableProps {
  orders: Order[];
  showDetails?: boolean;
}

export function OrdersTable({ orders, showDetails = false }: OrdersTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} className="card-paper" sx={{ p: '0 !important', overflow: 'hidden' }}>
      <Table sx={{ minWidth: showDetails ? 800 : 650 }}>
        <TableHead className={`${styles.tableHeader}`}>
          <TableRow>
            <TableCell className={`${styles.tableHeaderCell}`}>№ Заказа</TableCell>
            <TableCell className={`${styles.tableHeaderCell}`}>{showDetails ? "Клиент / Тел." : "Клиент"}</TableCell>
            {showDetails && <TableCell className={`${styles.tableHeaderCell}`}>Адрес</TableCell>}
            <TableCell className={`${styles.tableHeaderCell}`}>Статус</TableCell>
            {showDetails ? (
              <TableCell className={`${styles.tableHeaderCell}`}>Оплата</TableCell>
            ) : (
              <>
                <TableCell className={`${styles.tableHeaderCell}`}>Сумма</TableCell>
                <TableCell className={`${styles.tableHeaderCell}`}>Дата</TableCell>
              </>
            )}
            <TableCell align="right" className={`${styles.tableHeaderCell}`}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row" className="medium">
                <Typography variant="body2" className="bold" color="primary">
                  {order.order_number}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {order.id.split('-')[0]}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="medium">{order.user_full_name}</Typography>
                {showDetails && (
                  <Typography variant="caption" color="text.secondary">{order.phone_number}</Typography>
                )}
              </TableCell>
              {showDetails && (
                <TableCell sx={{ maxWidth: 200 }}>
                  <Typography variant="caption" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {order.delivery_address}
                  </Typography>
                </TableCell>
              )}
              <TableCell>
                <Chip 
                  label={orderStates[order.order_state_id] || 'Неизвестно'} 
                  size="small"
                  color={order.order_state_id === 2 ? 'warning' : order.order_state_id === 4 ? 'success' : 'info'}
                  sx={{ borderRadius: 1 }}
                />
              </TableCell>
              
              {showDetails ? (
                <TableCell>
                  <Typography variant="body2" color={order.payment_state_id === 2 ? 'success.main' : 'warning.main'}>
                    {paymentStates[order.payment_state_id] || 'Ожидает'}
                  </Typography>
                </TableCell>
              ) : (
                <>
                  <TableCell className="medium">{Math.floor(order.total_amount).toLocaleString()} ₽</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                </>
              )}
              
              <TableCell align="right">
                {showDetails ? (
                  <Button variant="outlined" size="small">
                    {order.order_state_id === 1 ? 'В работу' : 'Детали'}
                  </Button>
                ) : (
                  <Typography 
                    variant="body2" 
                    className="clickable-link"
                  >
                    {order.order_state_id === 1 ? 'Обработать' : 'Просмотр'}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import {
  Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button
} from "@mui/material";

interface Order {
  id: string;
  client: string;
  phone?: string;
  content?: string;
  status: string;
  paymentStatus?: string;
  sum?: number;
  date?: string;
}

interface OrdersTableProps {
  orders: Order[];
  showDetails?: boolean;
}

export function OrdersTable({ orders, showDetails = false }: OrdersTableProps) {
  return (
      <TableContainer component={Paper} elevation={0} className="card-paper" sx={{ p: '0 !important', overflow: 'hidden' }}>
        <Table sx={{ minWidth: showDetails ? 800 : 650 }}>
          <TableHead className="table-header">
            <TableRow>
              <TableCell className="table-header-cell">№ Заказа</TableCell>
              <TableCell className="table-header-cell">{showDetails ? "Клиент / Тел." : "Клиент"}</TableCell>
              {showDetails && <TableCell className="table-header-cell">Состав</TableCell>}
              <TableCell className="table-header-cell">Статус</TableCell>
              {showDetails ? (
                  <TableCell className="table-header-cell">Оплата</TableCell>
              ) : (
                  <>
                    <TableCell className="table-header-cell">Сумма</TableCell>
                    <TableCell className="table-header-cell">Дата</TableCell>
                  </>
              )}
              <TableCell align="right" className="table-header-cell">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row" className="medium">{order.id}</TableCell>
                  <TableCell>
                    {showDetails ? (
                        <>
                          <Typography variant="body2" className="medium">{order.client}</Typography>
                          <Typography variant="caption" color="text.secondary">{order.phone}</Typography>
                        </>
                    ) : (
                        order.client
                    )}
                  </TableCell>
                  {showDetails && <TableCell>{order.content}</TableCell>}
                  <TableCell>
                    <Chip
                        label={order.status}
                        size="small"
                        color={order.status === 'В пути' ? 'warning' : 'info'}
                        sx={{ borderRadius: 1 }}
                    />
                  </TableCell>

                  {showDetails ? (
                      <TableCell>{order.paymentStatus}</TableCell>
                  ) : (
                      <>
                        <TableCell className="medium">{order.sum} ₽</TableCell>
                        <TableCell>{order.date}</TableCell>
                      </>
                  )}

                  <TableCell align="right">
                    {showDetails ? (
                        <Button variant="contained" size="small">
                          {order.status === 'Новый' ? 'В работу' : 'Трек-код'}
                        </Button>
                    ) : (
                        <Typography
                            variant="body2"
                            className="clickable-link"
                        >
                          {order.status === 'Новый' ? 'Обработать' : 'Просмотр'}
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

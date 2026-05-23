import {
    Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, Select, MenuItem, Box, FormControl
} from "@mui/material";
import styles from './OrdersTable.module.css';
import { Order, ReferenceData } from "../../types";

interface OrdersTableProps {
    orders: Order[];
    showDetails?: boolean;
    orderStatuses?: ReferenceData[];
    paymentStatuses?: ReferenceData[];
    onStatusChange?: (orderId: string, statusId: number) => void;
    onPaymentChange?: (orderId: string, paymentStatusId: number) => void;
}

export function OrdersTable({
                                orders,
                                showDetails = false,
                                orderStatuses = [],
                                paymentStatuses = [],
                                onStatusChange,
                                onPaymentChange
                            }: OrdersTableProps) {
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
                            <>
                                <TableCell className={`${styles.tableHeaderCell}`}>Оплата</TableCell>
                                <TableCell align="right" className={`${styles.tableHeaderCell}`}>Дата</TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell className={`${styles.tableHeaderCell}`}>Сумма</TableCell>
                                <TableCell align="right" className={`${styles.tableHeaderCell}`}>Дата</TableCell>
                            </>
                        )}
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
                                {showDetails && orderStatuses.length > 0 ? (
                                    <FormControl size="small" fullWidth sx={{ minWidth: 150 }}>
                                        <Select
                                            value={order.order_state_id}
                                            onChange={(e) => onStatusChange?.(order.id, e.target.value as number)}
                                            sx={{ fontSize: '0.875rem' }}
                                        >
                                            {orderStatuses.map((s) => (
                                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Chip
                                        label={orderStatuses.find(s => s.id === order.order_state_id)?.name || `Статус #${order.order_state_id}`}
                                        size="small"
                                        color={order.order_state_id === 2 ? 'warning' : order.order_state_id === 4 ? 'success' : 'info'}
                                        sx={{ borderRadius: 1 }}
                                    />
                                )}
                            </TableCell>

                            {showDetails ? (
                                <>
                                    <TableCell>
                                        {paymentStatuses.length > 0 ? (
                                            <FormControl size="small" fullWidth sx={{ minWidth: 150 }}>
                                                <Select
                                                    value={order.payment_state_id}
                                                    onChange={(e) => onPaymentChange?.(order.id, e.target.value as number)}
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: order.payment_state_id === 2 ? 'success.main' : 'warning.main'
                                                    }}
                                                >
                                                    {paymentStatuses.map((s) => (
                                                        <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <Typography variant="body2" color={order.payment_state_id === 2 ? 'success.main' : 'warning.main'}>
                                                {order.payment_state_id === 2 ? 'Оплачено' : 'Ожидает'}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell className="medium">{Math.floor(order.total_amount).toLocaleString()} ₽</TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

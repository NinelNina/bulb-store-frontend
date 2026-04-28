import { mockOrders } from "../../data/mock";
import {
    Box, Typography, Grid
} from "@mui/material";
import { StatCard } from "../../components/StatCard/StatCard";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";

export function AdminDashboardPage() {
    return (
        <Box className="flex-column" sx={{ gap: 4 }}>
            <Typography variant="h5" className="bold">
                Обзор магазина
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Заказов сегодня"
                        value="42"
                        subtitle="↑ 12% к вчера"
                        subtitleColor="success.main"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Выручка (₽)"
                        value="128 450"
                        subtitle="Оплата при получении"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Новые заявки"
                        value="5"
                        valueColor="error.main"
                        subtitle="Требуют обработки"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title="Остатки < 10 шт"
                        value="3 позиции"
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
                <OrdersTable orders={mockOrders.slice(0, 5)} />
            </Box>
        </Box>
    );
}



import { mockOrders } from "../../data/mock";
import { Box, Typography } from "@mui/material";
import { OrdersFilterBar } from "../../components/OrdersFilterBar/OrdersFilterBar";
import { OrdersTable } from "../../components/OrdersTable/OrdersTable";

export function AdminOrdersPage() {
    return (
        <Box className="flex-column" sx={{ gap: 4 }}>
            <Typography variant="h5" className="bold">Управление заказами</Typography>
            <OrdersFilterBar />
            <OrdersTable orders={mockOrders} showDetails />
        </Box>
    );
}


import { mockProducts } from "../../data/mock";
import {
    Box, Typography, Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ProductsTable } from "../../components/ProductsTable/ProductsTable";

export function AdminCatalogPage() {
    return (
        <Box className="flex-column" sx={{ gap: 4 }}>
            <Box className="flex-between">
                <Typography variant="h5" className="bold">Управление каталогом</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Добавить товар
                </Button>
            </Box>

            <ProductsTable products={mockProducts} />
        </Box>
    );
}


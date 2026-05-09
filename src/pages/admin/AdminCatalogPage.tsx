import { 
  Box, Typography, Button, CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ProductsTable } from "../../components/ProductsTable/ProductsTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/productActions";
import { useEffect } from "react";

export function AdminCatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const status = useAppSelector(state => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <Box className="flex-column" sx={{ gap: 4 }}>
      <Box className="flex-between">
        <Typography variant="h5" className="bold">Управление каталогом</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Добавить товар
        </Button>
      </Box>

      {status === 'loading' ? (
        <CircularProgress />
      ) : (
        <ProductsTable products={products} />
      )}
    </Box>
  );
}


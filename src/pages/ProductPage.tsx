import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, Grid, Paper, CircularProgress, Typography
} from "@mui/material";
import { fetchProduct } from "../redux/productActions";
import { RootState } from "../redux/store";
import { ProductInfo } from "../components/ProductInfo/ProductInfo";
import { ProductReviews } from "../components/ProductReviews/ProductReviews";

export function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.currentProduct);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id) as any);
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <Box className="flex-center" sx={{ p: 10 }}><CircularProgress /></Box>;
  }

  if (!product) {
    return <Box className="flex-center" sx={{ p: 10 }}><Typography>Товар не найден</Typography></Box>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              aspectRatio: '1', bgcolor: 'grey.100', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {product.photoUrl ? (
                <img 
                  src={product.photoUrl} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                />
              ) : (
                <Box sx={{ 
                  width: 250, height: 250, bgcolor: 'grey.200', borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'text.secondary'
                }}>
                  📸 Изображение товара
                </Box>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>
      </Paper>

      <ProductReviews productId={product.id} />
    </Box>
  );
}


import { useParams } from "react-router-dom";
import { mockProducts } from "../data/mock";
import { 
  Box, Grid, Paper 
} from "@mui/material";
import { ProductInfo } from "../components/ProductInfo/ProductInfo";
import { ProductReviews } from "../components/ProductReviews/ProductReviews";

export function ProductPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Grid container spacing={6}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              aspectRatio: '1', bgcolor: 'grey.100', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Box sx={{ 
                width: 250, height: 250, bgcolor: 'grey.200', borderRadius: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'text.secondary'
              }}>
                📸 Изображение товара
              </Box>
            </Box>
          </Grid>

          {/* Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews */}
      <ProductReviews rating={product.rating} reviewsCount={product.reviewsCount} />
    </Box>
  );
}


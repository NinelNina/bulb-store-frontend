import { Link as RouterLink } from "react-router-dom";
import { 
  Box, Typography, Card, CardContent, CardActions, Button
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../../context/CartContext";
import styles from './ProductCard.module.css';
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: ""
    });
  };

  return (
    <Card className={`${styles.productCard}`}>
      <Box component={RouterLink} to={`/product/${product.id}`} className="no-underline">
        <Box className={`${styles.productImageContainer}`}>
          <Box className={`${styles.productImagePlaceholder}`}>
            📷 Фото
          </Box>
        </Box>
      </Box>
      <CardContent className="flex-column flex-grow" sx={{ pb: 1 }}>
        <Typography 
          component={RouterLink} 
          to={`/product/${product.id}`}
          variant="subtitle2" 
          className={`${styles.productName}`}
        >
          {product.name}
        </Typography>
        
        <Box className={`${styles.ratingBox}`}>
          <StarIcon className={`${styles.ratingStar}`} />
          <Typography variant="caption" color="text.secondary">
            4.8 (25)
          </Typography>
        </Box>

        <Box className="mt-auto">
          <Typography variant="h6" className={`${styles.productPrice}`}>
            {Number(product.price).toLocaleString()} ₽
          </Typography>
          
          <Typography variant="caption" className={`${styles.productStock}`} sx={{ color: product.quantity === 0 ? 'error.main' : 'inherit' }}>
            {product.quantity > 0 && <Box className={`${styles.statusDot}`} />}
            {product.quantity > 0 ? `${product.quantity} шт. в наличии` : 'Нет в наличии'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 1 }}>
        <Button 
          variant="contained" 
          fullWidth 
          color="primary" 
          className="bold no-transform"
          sx={{ borderRadius: 2 }}
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
        >
          {product.quantity > 0 ? 'Добавить в корзину' : 'Нет в наличии'}
        </Button>
      </CardActions>
    </Card>
  );
}

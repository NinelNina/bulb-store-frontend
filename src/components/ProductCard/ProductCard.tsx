import { Link as RouterLink } from "react-router-dom";
import { 
  Box, Typography, Card, CardContent, CardActions, Button, IconButton, ButtonBase
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../../context/CartContext";
import styles from './ProductCard.module.css';
import { Product } from "../../types";
import { useAppSelector } from "../../redux/hooks";

interface ProductCardProps {
  product: Product;
}

const DEFAULT_RATING = { rating: 0, reviewsCount: 0 };

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, removeFromCart, items } = useCart();
  const rating = useAppSelector(state => state.products.ratings[product.id] || DEFAULT_RATING);
  const cartItem = items.find(item => item.id === product.id);


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

  const handleUpdateQuantity = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQuantity === 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card className={`${styles.productCard}`}>
      <Box component={RouterLink} to={`/product/${product.id}`} className="no-underline">
        <Box className={`${styles.productImageContainer}`}>
          {product.photoUrl ? (
            <img src={product.photoUrl} alt={product.name} className={`${styles.productImage}`} />
          ) : (
            <Box className={`${styles.productImagePlaceholder}`}>
              📷 Фото
            </Box>
          )}
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
          <StarIcon className={`${styles.ratingStar}`} sx={{ color: rating.reviewsCount > 0 ? '#fbbf24' : 'grey.300' }} />
          <Typography variant="caption" color="text.secondary">
            {rating.rating > 0 ? Number(rating.rating).toFixed(1) : "0.0"} ({rating.reviewsCount})
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
        {cartItem ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            width: '100%',
            height: '36.5px',
            overflow: 'hidden'
          }}>
            <ButtonBase 
              onClick={(e) => handleUpdateQuantity(e, cartItem.quantity - 1)}
              sx={{ 
                height: '100%', 
                width: '30%', 
                borderRight: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary'
              }}
            >
              <RemoveIcon fontSize="small" />
            </ButtonBase>
            
            <Box sx={{ 
              height: '100%', 
              width: '40%', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                {cartItem.quantity}
              </Typography>
            </Box>

            <ButtonBase 
              onClick={(e) => handleUpdateQuantity(e, cartItem.quantity + 1)}
              disabled={cartItem.quantity >= product.quantity}
              sx={{ 
                height: '100%', 
                width: '30%', 
                borderLeft: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
                opacity: cartItem.quantity >= product.quantity ? 0.5 : 1
              }}
            >
              <AddIcon fontSize="small" />
            </ButtonBase>
          </Box>
        ) : (
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
        )}
      </CardActions>
    </Card>
  );
}

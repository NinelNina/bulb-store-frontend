import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useCart } from "../../../../../Итоговое дз/bulb-store-frontend/src/context/CartContext.tsx";
import styles from '../../../../../Итоговое дз/bulb-store-frontend/src/components/ProductInfo/ProductInfo.module.css';
import { Product } from "../../../../../Итоговое дз/bulb-store-frontend/src/types.ts";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, updateQuantity, items } = useCart();

  const handleAdd = () => setQuantity(prev => prev + 1);
  const handleRemove = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: ""
        });
    }
  };

  return (
    <Box className={`${styles.productInfoContainer}`}>
      <Typography variant="h4" gutterBottom className={`${styles.productInfoTitle}`}>
        {product.name}
      </Typography>

      <Paper elevation={0} className="card-paper" sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom className="bold">
          Цена и покупка
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h5" color="text.primary" className="bold">
            {product.price} ₽
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, color: product.quantity === 0 ? 'error.main' : 'success.main', fontWeight: 'medium' }}>
          {product.quantity > 0 ? `● В наличии: ${product.quantity} шт.` : '◌ Нет в наличии'}
        </Typography>

        <Box className={`${styles.quantityPicker}`}>
          <Typography color="text.secondary">Кол-во:</Typography>
          <Box className={`${styles.quantityControls}`}>
            <IconButton size="small" onClick={handleRemove}><RemoveIcon fontSize="small" /></IconButton>
            <Box className={`${styles.quantityValue}`}>
              {quantity}
            </Box>
            <IconButton size="small" onClick={handleAdd}><AddIcon fontSize="small" /></IconButton>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          size="large" 
          fullWidth
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
        >
          {product.quantity > 0 ? 'Добавить в корзину' : 'Нет в наличии'}
        </Button>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom className="bold">
          Характеристики:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          • {product.power}W | {product.brightness} Лм | {product.color_temperature + 'K'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          • Цоколь: {product.socket}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          • Форма: {product.shape}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Гарантия: 24 мес
        </Typography>
      </Box>
    </Box>
  );
}

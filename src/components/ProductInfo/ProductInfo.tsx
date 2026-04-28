import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    model: string;
    price: number;
    power: number;
    brightness: number;
    colorTemp: string;
    base: string;
    shape: string;
    type: string;
  };
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
      <Box className="product-info-container">
        <Typography variant="h4" gutterBottom className="product-info-title">
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Модель: {product.model}
        </Typography>

        <Paper elevation={0} className="card-paper" sx={{ mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom className="bold">
            Цена и покупка
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h5" color="text.primary" className="bold">
              {product.price} ₽
            </Typography>
          </Box>

          <Box className="quantity-picker">
            <Typography color="text.secondary">Кол-во:</Typography>
            <Box className="quantity-controls">
              <IconButton size="small" onClick={handleRemove}><RemoveIcon fontSize="small" /></IconButton>
              <Box className="quantity-value">
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
          >
            Добавить в корзину
          </Button>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom className="bold">
            Характеристики:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            • {product.power}W | {product.brightness} Лм | {product.colorTemp}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            • Цоколь: {product.base}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            • Форма: {product.shape}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            • Тип: {product.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Гарантия: 24 мес
          </Typography>
        </Box>
      </Box>
  );
}

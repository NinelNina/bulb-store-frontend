import {
  Box, Typography, Paper, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
      <Paper elevation={0} className="cart-item-paper">
        <Box className="cart-item-info">
          <Box className="cart-item-image" sx={{ fontSize: 24 }}>💡</Box>
          <Box>
            <Typography className="bold">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">Цена: {item.price} ₽/шт</Typography>
          </Box>
        </Box>

        <Box className="cart-item-actions" sx={{ gap: 4 }}>
          <Box className="flex-center" sx={{ flexDirection: 'column' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>Кол-во</Typography>
            <Box className="quantity-controls">
              <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></IconButton>
              <Box className="quantity-value">{item.quantity}</Box>
              <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
            </Box>
          </Box>

          <Box sx={{ minWidth: 80, textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Сумма</Typography>
            <Typography className="bold">{item.price * item.quantity} ₽</Typography>
          </Box>

          <IconButton onClick={() => onRemove(item.id)} color="error" className="remove-btn">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
  );
}

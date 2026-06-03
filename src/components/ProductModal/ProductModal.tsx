import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, MenuItem, CircularProgress 
} from "@mui/material";
import { useState, useEffect } from "react";
import { Product, Category } from "../../types";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => Promise<void>;
  product?: Product | null;
  categories: Category[];
}

export function ProductModal({ open, onClose, onSave, product, categories }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    socket: "",
    power: 0,
    color_temperature: 0,
    brightness: 0,
    shape: "",
    description: "",
    price: 0,
    quantity: 0,
    category_id: "",
    photoUrl: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        socket: "",
        power: 0,
        color_temperature: 0,
        brightness: 0,
        shape: "",
        description: "",
        price: 0,
        quantity: 0,
        category_id: categories[0]?.id || "",
        photoUrl: ""
      });
    }
  }, [product, categories, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{product ? "Редактировать товар" : "Добавить товар"}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField 
              label="Название" 
              fullWidth 
              size="small" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField 
              select
              label="Категория" 
              fullWidth 
              size="small" 
              value={formData.category_id} 
              onChange={e => setFormData({ ...formData, category_id: e.target.value })}
              required
            >
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField 
                label="Цоколь" 
                fullWidth 
                size="small" 
                value={formData.socket} 
                onChange={e => setFormData({ ...formData, socket: e.target.value })}
                required
              />
              <TextField 
                label="Форма" 
                fullWidth 
                size="small" 
                value={formData.shape} 
                onChange={e => setFormData({ ...formData, shape: e.target.value })}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField 
                label="Мощность (Вт)" 
                type="number"
                fullWidth 
                size="small" 
                value={formData.power} 
                onChange={e => setFormData({ ...formData, power: Number(e.target.value) })}
                required
              />
              <TextField 
                label="Яркость (Лм)" 
                type="number"
                fullWidth 
                size="small" 
                value={formData.brightness} 
                onChange={e => setFormData({ ...formData, brightness: Number(e.target.value) })}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField 
                label="Цвет. темп. (K)" 
                type="number"
                fullWidth 
                size="small" 
                value={formData.color_temperature} 
                onChange={e => setFormData({ ...formData, color_temperature: Number(e.target.value) })}
                required
              />
              <TextField 
                label="Цена (₽)" 
                type="number"
                fullWidth 
                size="small" 
                value={formData.price} 
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </Box>
            <TextField 
              label="Количество" 
              type="number"
              fullWidth 
              size="small" 
              value={formData.quantity} 
              onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
              required
            />
            <TextField 
              label="Описание" 
              multiline
              rows={3}
              fullWidth 
              size="small" 
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Ссылка на фото"
              fullWidth
              size="small"
              value={formData.photoUrl || ""}
              onChange={e => setFormData({ ...formData, photoUrl: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">Отмена</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

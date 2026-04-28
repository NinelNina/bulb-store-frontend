import { useState } from "react";
import { 
  Box, Typography, TextField, Button, Paper, Divider, InputAdornment, Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState("ORD-78432");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setSearched(true);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Отслеживание заказа
        </Typography>
        <Typography color="text.secondary">
          Введите номер заказа → получите актуальный статус.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="ORD-78432"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" size="large" sx={{ px: 4 }}>
          Найти
        </Button>
      </Box>

      {searched && (
        <Paper elevation={0} sx={{ borderRadius: 3, border: 1, borderColor: 'grey.200', overflow: 'hidden' }}>
          <Box sx={{ p: 4, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'grey.200' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Заказ #{orderId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Создан: 07.04.2026 | Оплата: <Typography component="span" color="success.main" sx={{ fontWeight: 'medium' }}>Оплачен</Typography>
            </Typography>
            
            <Box sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: 1, color: '#b45309', bgcolor: '#fef3c7', px: 2, py: 1, borderRadius: 2, border: 1, borderColor: '#fde68a' }}>
              <Typography component="span" sx={{ fontSize: 20 }}>🚚</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>В пути</Typography>
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Детали доставки
            </Typography>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', border: 1, borderColor: 'grey.100', mb: 4 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Служба</Typography>
                  <Typography sx={{ fontWeight: 'medium' }}>СДЭК</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Трек номер</Typography>
                  <Typography sx={{ fontWeight: 'medium' }}>1234567890</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Ожидаемая дата</Typography>
                  <Typography sx={{ fontWeight: 'medium' }}>12.04.2026</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Обратная связь по заказу
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField 
                multiline 
                rows={3} 
                fullWidth 
                placeholder="Оставить отзыв или задать вопрос..." 
              />
              <Box>
                <Button variant="contained">
                  Отправить
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

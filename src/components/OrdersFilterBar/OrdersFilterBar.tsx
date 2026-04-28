import { 
  Box, Typography, Paper, Button, Select, MenuItem, TextField
} from "@mui/material";

export function OrdersFilterBar() {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'grey.200', display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Статус:</Typography>
        <Select size="small" defaultValue="all" sx={{ minWidth: 120 }}>
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="new">Новый</MenuItem>
          <MenuItem value="transit">В пути</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Дата:</Typography>
        <TextField size="small" placeholder="01.04 - 10.04" sx={{ width: 140 }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Поиск:</Typography>
        <TextField size="small" fullWidth placeholder="Номер, клиент..." />
      </Box>
      <Button variant="contained">Применить</Button>
    </Paper>
  );
}

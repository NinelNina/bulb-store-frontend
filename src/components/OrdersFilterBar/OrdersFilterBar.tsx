import {
  Box, Typography, Paper, Button, Select, MenuItem, TextField
} from "@mui/material";
import { useState } from "react";
import { ReferenceData } from "../../types";
import styles from './OrdersFilterBar.module.css';

interface OrdersFilterBarProps {
  statuses: ReferenceData[];
  onFilter: (filters: { orderStateId: string | number; createdAt?: string; query?: string }) => void;
}

export function OrdersFilterBar({ statuses, onFilter }: OrdersFilterBarProps) {
  const [status, setStatus] = useState<string | number>("all");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");

  const handleApply = () => {
    onFilter({
      orderStateId: status,
      createdAt: date || undefined,
      query: query || undefined
    });
  };

  return (
    <Paper elevation={0} className={styles.container}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Статус:</Typography>
        <Select 
          size="small" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">Все</MenuItem>
          {statuses.map(s => (
            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Дата:</Typography>
        <TextField 
          size="small" 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: 160 }} 
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>
      <Box className={styles.search} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Поиск:</Typography>
        <TextField 
          size="small" 
          fullWidth 
          placeholder="Номер, клиент..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleApply}>Применить</Button>
    </Paper>
  );
}

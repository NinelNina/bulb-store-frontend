import { Box, Typography, Button } from "@mui/material";
import styles from './ConstructorSummary.module.css';


interface ConstructorSummaryProps {
  total: number;
}

export function ConstructorSummary({ total }: ConstructorSummaryProps) {
  return (
    <Box className={`${styles.summaryBox}`}>
      <Typography variant="h6" className="hero-title">
        Расчет стоимости
      </Typography>
      
      <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
        Цена за единицу: 380 ₽
      </Typography>
      
      <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
        Итого за партию: {total.toLocaleString('ru-RU')} ₽
      </Typography>

      <Button 
        variant="contained" 
        size="large" 
        color="primary" 
        sx={{ 
          mb: { xs: 4, md: 8 }, 
          alignSelf: 'flex-start',
          px: 4, 
        }}
      >
        Оформить предзаказ
      </Button>

      <Typography variant="body2" color="text.primary" sx={{ mt: 'auto' }} className="flex-center">
        <Box component="span" sx={{ mr: 1 }}>📝</Box> Оплата по факту получения. Доставка сторонней службой или самовывоз.
      </Typography>
    </Box>
  );
}

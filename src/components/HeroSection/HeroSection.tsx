import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styles from './HeroSection.module.css';


export function HeroSection() {
  return (
    <Box className={`${styles.heroSection}`}>
      <Typography variant="h5" gutterBottom className={`${styles.heroTitle}`}>
        Энергосберегающие решения: бытовые, промышленные, на заказ
      </Typography>
      <Typography variant="body1" className={`${styles.heroSubtitle}`}>
        Принесите старую лампу → изготовим современный аналог. Работаем с физ. и юр. лицами.
      </Typography>
      <Button 
        component={RouterLink} 
        to="/catalog" 
        variant="contained" 
        color="primary"
        size="large"
      >
        Перейти в каталог
      </Button>
    </Box>
  );
}

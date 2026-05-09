import { Outlet, Link as RouterLink } from "react-router-dom";
import { 
  Typography, Button, Container, Box
} from "@mui/material";
import { Header } from "../Header/Header";
import styles from './ClientLayout.module.css';


export function ClientLayout() {
  return (
    <Box className={styles.layoutWrapper}>
      <Header />

      <Box component="main" className={styles.mainContent}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>

      <Box component="footer" className={styles.appFooterMain}>
        <Container maxWidth="xl" className="flex-between">
          <Typography variant="body2" color="text.secondary">
            © 2026 Магазин ламп
          </Typography>
          <Typography 
            component={RouterLink} 
            to="/admin" 
            variant="body2" 
            color="text.secondary" 
            className="clickable-link"
            sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
          >
            Вход для сотрудников
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function HeroSection() {
    return (
        <Box className="hero-section">
            <Typography variant="h5" gutterBottom className="hero-title">
                Энергосберегающие решения: бытовые, промышленные, на заказ
            </Typography>
            <Typography variant="body1" className="hero-subtitle">
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

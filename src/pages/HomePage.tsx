import { Box, Typography, Grid } from "@mui/material";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { CategoryCard } from "../components/CategoryCard/CategoryCard";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  return (
      <Box>
        <HeroSection />

        <Box className="category-grid">
          <Typography variant="h6" className="hero-title">
            Популярные категории
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CategoryCard
                  icon="🏠"
                  title="Бытовые (E27, E14)"
                  onClick={() => navigate('/catalog?category=home')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CategoryCard
                  icon="🏭"
                  title="Промышленные (прожекторы, LED-панели)"
                  onClick={() => navigate('/catalog?category=industrial')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CategoryCard
                  icon="🔧"
                  title="На заказ / Реплика"
                  onClick={() => navigate('/constructor')}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
}

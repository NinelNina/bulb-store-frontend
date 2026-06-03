import { Box, Typography, Grid } from "@mui/material";
import { HeroSection } from "../components/HeroSection/HeroSection";
import { CategoryCard } from "../components/CategoryCard/CategoryCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCategories } from "../redux/productActions";
import styles from './HomePage.module.css';

const categoryIcons: Record<string, string> = {
  'led': '💡',
  'smart': '📱',
  'filament': '🕯️',
  'vintage': '🕯️',
  'decorative': '✨',
  'default': '💡'
};

const getIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('led') || lower.includes('светодиод')) return categoryIcons.led;
  if (lower.includes('smart') || lower.includes('умн')) return categoryIcons.smart;
  if (lower.includes('filament') || lower.includes('винтаж')) return categoryIcons.filament;
  if (lower.includes('декор')) return categoryIcons.decorative;
  return categoryIcons.default;
};

export function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.products.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <Box>
      <HeroSection />

      <Box className={`${styles.categoryGrid}`}>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid key={cat.id} size={{ xs: 12, sm: 4 }}>
              <CategoryCard 
                icon={getIcon(cat.name)} 
                title={cat.name} 
                onClick={() => navigate(`/catalog?category=${cat.id}`)}
              />
            </Grid>
          ))}
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

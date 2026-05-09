import { Box, Typography } from "@mui/material";
import styles from './CategoryCard.module.css';


interface CategoryCardProps {
  title: string;
  icon?: string;
  onClick?: () => void;
}

export function CategoryCard({ title, icon, onClick }: CategoryCardProps) {
  return (
    <Box 
      onClick={onClick}
      className={`card-paper ${styles.categoryCard} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <Box className={`${styles.categoryIconWrapper}`}>
        {icon}
      </Box>
      <Typography variant="subtitle1" className="bold">
        {title}
      </Typography>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

interface CategoryCardProps {
    title: string;
    icon?: string;
    onClick?: () => void;
}

export function CategoryCard({ title, icon, onClick }: CategoryCardProps) {
    return (
        <Box
            onClick={onClick}
            className={`card-paper category-card ${onClick ? 'cursor-pointer' : ''}`}
        >
            <Box className="category-icon-wrapper">
                {icon}
            </Box>
            <Typography variant="subtitle1" className="bold">
                {title}
            </Typography>
        </Box>
    );
}

import { Typography, Paper } from "@mui/material";
import styles from './StatCard.module.css';


interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    subtitleColor?: string;
    valueColor?: string;
    onClick?: () => void;
}

export function StatCard({ title, value, subtitle, subtitleColor = "text.secondary", valueColor = "text.primary", onClick }: StatCardProps) {
    return (
        <Paper elevation={0} className={`card-paper ${styles.adminStatCard}`}>
            <Typography variant="body2" color="text.secondary" className="medium mb-1">{title}</Typography>
            <Typography variant="h4" color={valueColor} className="bold">{value}</Typography>
            <Typography
                variant="caption"
                color={subtitleColor}
                className={`mt-1 display-block ${onClick ? 'clickable-link' : ''}`}
                onClick={onClick}
            >
                {subtitle}
            </Typography>
        </Paper>
    );
}

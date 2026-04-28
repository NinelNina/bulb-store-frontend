import { Typography, Paper } from "@mui/material";

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    subtitleColor?: "text.secondary" | "success.main" | "error.main" | "primary.main";
    valueColor?: "text.primary" | "error.main";
    onClick?: () => void;
}

export function StatCard({ title, value, subtitle, subtitleColor = "text.secondary", valueColor = "text.primary", onClick }: StatCardProps) {
    return (
        <Paper elevation={0} className="card-paper admin-stat-card">
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

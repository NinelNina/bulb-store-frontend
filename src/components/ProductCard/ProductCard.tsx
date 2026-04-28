import { Link as RouterLink } from "react-router-dom";
import {
    Box, Typography, Card, CardContent, CardActions, Button
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        rating: number;
        reviewsCount: number;
        price: number;
        stock: number;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: "" // Using empty image for now
        });
    };

    return (
        <Card className="product-card">
            <Box component={RouterLink} to={`/product/${product.id}`} className="no-underline">
                <Box className="product-image-container">
                    <Box className="product-image-placeholder">
                        📷 Фото
                    </Box>
                </Box>
            </Box>
            <CardContent className="flex-column flex-grow" sx={{ pb: 1 }}>
                <Typography
                    component={RouterLink}
                    to={`/product/${product.id}`}
                    variant="subtitle2"
                    className="product-name"
                >
                    {product.name}
                </Typography>

                <Box className="rating-box">
                    <StarIcon className="rating-star" />
                    <Typography variant="caption" color="text.secondary">
                        {product.rating} ({product.reviewsCount})
                    </Typography>
                </Box>

                <Box className="mt-auto">
                    <Typography variant="h6" className="product-price">
                        {product.price} ₽
                    </Typography>

                    <Typography variant="caption" className="product-stock">
                        <Box className="status-dot" />
                        {product.stock} шт. в наличии
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 1 }}>
                <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    className="bold no-transform"
                    sx={{ borderRadius: 2 }}
                    onClick={handleAddToCart}
                >
                    Добавить в корзину
                </Button>
            </CardActions>
        </Card>
    );
}

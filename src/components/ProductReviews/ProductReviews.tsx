import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Rating, Divider, Alert, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ProductReviewsProps {
  rating: number;
  reviewsCount: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export function ProductReviews({ rating: initialRating, reviewsCount: initialCount }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Иван К.",
      rating: 5,
      date: "12.03.2026",
      text: "Отличная яркость, заменил старые галогенки без проблем."
    },
    {
      id: 2,
      author: "🏢 ООО \"Светстрой\"",
      rating: 4,
      date: "05.04.2026",
      text: "Заказывали оптом для склада. Доставка через СДЭК, всё целое."
    }
  ]);

  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    text: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;

    const review: Review = {
      id: Date.now(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('ru-RU'),
      text: newReview.text
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: "", rating: 5, text: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Отзывы и рейтинг
      </Typography>
      
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
            <StarIcon sx={{ color: '#fbbf24' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {initialRating}
            </Typography>
            <Typography color="text.secondary">
              из 5 ({reviews.length} отзывов)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {reviews.map((review) => (
              <Paper key={review.id} elevation={0} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ fontWeight: 'medium', mr: 1 }}>{review.author}</Typography>
                  <Box sx={{ display: 'flex', color: '#fbbf24' }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} fontSize="small" sx={{ color: i < review.rating ? '#fbbf24' : 'grey.300' }} />
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                    {review.date}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'grey.200', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Оставить отзыв
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Отзыв успешно отправлен!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Ваше имя</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  placeholder="Имя или название компании"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  required
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Ваша оценка</Typography>
                <Rating 
                  value={newReview.rating}
                  onChange={(_, value) => setNewReview({ ...newReview, rating: value || 5 })}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Комментарий</Typography>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={4} 
                  placeholder="Расскажите о ваших впечатлениях..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  required
                />
              </Box>

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ borderRadius: 2, py: 1 }}
              >
                Отправить отзыв
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

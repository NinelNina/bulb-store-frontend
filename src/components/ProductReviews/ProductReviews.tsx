import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Rating, Alert, Grid, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from './ProductReviews.module.css';
import { api } from "../../services/api";
import { useAppDispatch } from "../../redux/hooks";

interface ProductReviewsProps {
  productId: string;
}

interface Review {
  id: string;
  author?: string;
  authorName?: string;
  author_name?: string;
  rating?: number;
  score?: number;
  text?: string;
  description?: string;
  createdAt: string;
  created_at?: string;
}

interface RatingResponse {
  rating: number;
  reviewsCount: number;
  reviews_count?: number;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const dispatch = useAppDispatch();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [productRating, setProductRating] = useState<RatingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    text: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorDesc, setErrorDesc] = useState('');

  const fetchReviewsData = async () => {
    try {
      setLoading(true);
      const [reviewsRes, ratingRes] = await Promise.all([
        api.get<Review[]>(`/reviews/products/${productId}`),
        api.get<RatingResponse>(`/reviews/ratings/products/${productId}`)
      ]);
      setReviews(Array.isArray(reviewsRes) ? reviewsRes : (reviewsRes as any).items || []);
      setProductRating(ratingRes);
      dispatch({ 
        type: 'UPDATE_RATINGS', 
        payload: { [productId]: { rating: ratingRes.rating || 0, reviewsCount: ratingRes.reviewsCount || ratingRes.reviews_count || 0 } } 
      });
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviewsData();
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;

    setSubmitting(true);
    setErrorDesc('');
    try {
      const payload = {
        authorName: newReview.author,
        description: newReview.text,
        score: newReview.rating
      };
      await api.post(`/reviews/products/${productId}`, payload);
      setNewReview({ author: "", rating: 5, text: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      await fetchReviewsData();
    } catch (err: any) {
      console.error(err);
      setErrorDesc(err.message || "Ошибка при отправке отзыва");
    } finally {
      setSubmitting(false);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((acc, r) => acc + (r.rating || r.score || 5), 0) / totalReviews 
    : 0;

  return (
    <Box className={styles.container}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Отзывы и рейтинг
      </Typography>
      
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                <StarIcon sx={{ color: '#fbbf24' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {averageRating.toFixed(1)}
                </Typography>
                <Typography color="text.secondary">
                  из 5 ({totalReviews} отзывов)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {reviews.length === 0 ? (
                  <Typography color="text.secondary">Пока нет отзывов. Станьте первым!</Typography>
                ) : (
                  reviews.map((review) => (
                    <Paper key={review.id} elevation={0} className={styles.reviewCard}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ fontWeight: 'medium', mr: 1 }}>{review.author || review.authorName || review.author_name || 'Аноним'}</Typography>
                        <Box sx={{ display: 'flex', color: '#fbbf24' }}>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} fontSize="small" sx={{ color: i < (review.rating || review.score || 5) ? '#fbbf24' : 'grey.300' }} />
                          ))}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                          {(review.createdAt || review.created_at) ? new Date(review.createdAt || review.created_at as string).toLocaleDateString() : ''}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {review.text || review.description}
                      </Typography>
                    </Paper>
                  ))
                )}
              </Box>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={0} className={styles.formCard}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Оставить отзыв
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Отзыв успешно отправлен!
              </Alert>
            )}

            {errorDesc && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorDesc}
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
                disabled={submitting}
                sx={{ borderRadius: 2, py: 1 }}
              >
                {submitting ? <CircularProgress size={24} /> : 'Отправить отзыв'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

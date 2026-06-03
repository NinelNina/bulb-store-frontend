import { useState } from "react";
import { 
  Box, Typography, Grid, Paper, TextField, Button, Checkbox, FormControlLabel, CircularProgress, Alert
} from "@mui/material";
import { api } from "../services/api";

export function RequestCallPage() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    customerName: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorDesc, setErrorDesc] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorDesc('');
    try {
      const payload = {
        phoneNumber: formData.phoneNumber,
        phone_number: formData.phoneNumber,
        email: formData.email,
        customerName: formData.customerName,
        customer_name: formData.customerName,
        description: formData.description
      };
      await api.post('/preorders', payload);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorDesc(err.message || 'Ошибка при отправке заявки');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Заявка успешно отправлена!</Typography>
        <Typography>Менеджер свяжется с вами в течение 15 минут.</Typography>
        <Button variant="outlined" sx={{ mt: 3 }} onClick={() => setSuccess(false)}>Оставить еще одну заявку</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Запросить обратный звонок
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Не нашли нужную лампу? Заполните форму → менеджер перезвонит.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: 1, borderColor: 'grey.200' }}>
            {errorDesc && <Alert severity="error" sx={{ mb: 3 }}>{errorDesc}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>📞 Телефон*:</Typography>
                <TextField 
                  fullWidth size="small" placeholder="+7 ___ ___ __ __" required 
                  name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>✉️ Email:</Typography>
                <TextField 
                  fullWidth size="small" type="email" placeholder="mail@example.com" 
                  name="email" value={formData.email} onChange={handleChange}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>🏢 ФИО / организация (для юр. лиц)*:</Typography>
                <TextField 
                  fullWidth size="small" placeholder="Иванов И.И." required 
                  name="customerName" value={formData.customerName} onChange={handleChange}
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>📝 Описание заказа / параметры лампы:</Typography>
                <TextField 
                  fullWidth multiline rows={4} placeholder="Опишите что необходимо..." 
                  name="description" value={formData.description} onChange={handleChange}
                />
              </Box>
              <FormControlLabel
                  control={<Checkbox required />}
                  label={<Typography component="span" variant="body2" color="text.secondary">Согласен на обработку данных для связи</Typography>}
              />
              <Button type="submit" variant="contained" size="large" disabled={submitting}>
                {submitting ? <CircularProgress size={24} /> : 'Отправить заявку'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'primary.50', borderRadius: 3, border: 1, borderColor: 'primary.100', position: 'sticky', top: 100 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Что будет дальше?
            </Typography>
            <Box component="ol" sx={{ m: 0, pl: 2, display: 'flex', flexDirection: 'column', gap: 2, color: 'text.secondary' }}>
              <li><Typography component="span" color="text.primary" sx={{ fontWeight: 'medium' }}>Заявка сохранена</Typography> в нашей системе.</li>
              <li><Typography component="span" color="text.primary" sx={{ fontWeight: 'medium' }}>Менеджер свяжется</Typography> в течение 15 мин в рабочее время.</li>
              <li><Typography component="span" color="text.primary" sx={{ fontWeight: 'medium' }}>Мы подберём аналог</Typography>, рассчитаем стоимость и согласуем доставку.</li>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

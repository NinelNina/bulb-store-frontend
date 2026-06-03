import { Box, Typography, Button, TextField, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";
import styles from './ConstructorSummary.module.css';

interface ConstructorSummaryProps {
  total: number;
  params: any;
}

export function ConstructorSummary({ total, params }: ConstructorSummaryProps) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    customerName: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorDesc, setErrorDesc] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const count = parseInt(params.count) || 0;
    if (count < 10) {
      setErrorDesc("Минимальный заказ: 10 штук.");
      return;
    }
    if (!formData.phoneNumber || !formData.customerName) {
      setErrorDesc("Заполните имя и телефон для оформления предзаказа.");
      return;
    }
    setSubmitting(true);
    setErrorDesc('');
    try {
      const payload = {
        phoneNumber: formData.phoneNumber,
        phone_number: formData.phoneNumber,
        customerName: formData.customerName,
        customer_name: formData.customerName,
        is_constructor: true,
        base: params.base,
        socket: params.base,
        power: params.power,
        temp: params.temp,
        colorTemperature: params.temp,
        brightness: params.brightness,
        shape: params.shape,
        count,
        quantity: count
      };
      await api.post('/preorders/constructor', payload);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorDesc(err.message || 'Ошибка при оформлении предзаказа');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Box className={`${styles.summaryBox}`} sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" gutterBottom color="success.main">Предзаказ успешно оформлен!</Typography>
        <Typography sx={{ mb: 3 }}>Мы свяжемся с вами в ближайшее время.</Typography>
        <Button variant="outlined" onClick={() => setSuccess(false)}>Оформить еще один</Button>
      </Box>
    );
  }

  return (
    <Box className={`${styles.summaryBox}`}>
      <Typography variant="h6" className="hero-title">
        Расчет стоимости
      </Typography>
      
      <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
        Цена за единицу: 380 ₽
      </Typography>
      
      <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
        Итого за партию: {total.toLocaleString('ru-RU')} ₽
      </Typography>

      {errorDesc && <Alert severity="error" sx={{ mb: 2 }}>{errorDesc}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField 
          label="ФИО / Название организации" 
          size="small" 
          fullWidth
          required
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />
        <TextField 
          label="Номер телефона" 
          size="small" 
          fullWidth
          required
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </Box>

      <Button 
        variant="contained" 
        size="large" 
        color="primary" 
        onClick={handleSubmit}
        disabled={submitting}
        sx={{ 
          mb: { xs: 4, md: 4 }, 
          alignSelf: 'stretch',
          px: 4, 
        }}
      >
        {submitting ? <CircularProgress size={24} color="inherit" /> : 'Оформить предзаказ'}
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', fontSize: '0.8rem' }}>
        <Box component="span" sx={{ mr: 1 }}>📝</Box> Оплата по факту получения. Доставка сторонней службой или самовывоз.
      </Typography>
    </Box>
  );
}

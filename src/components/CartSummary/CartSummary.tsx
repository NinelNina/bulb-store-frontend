import { 
  Box, Typography, Paper, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, TextField, Divider
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useState, useEffect } from "react";
import styles from './CartSummary.module.css';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDeliveryTypes } from "../../redux/orderActions";

interface CartSummaryProps {
  count: number;
  sum: number;
  disabled: boolean;
  onCheckout: (data: { client: string; phone: string; deliveryService: string; address?: string }) => void;
}

export function CartSummary({ count, sum, disabled, onCheckout }: CartSummaryProps) {
  const dispatch = useAppDispatch();
  const deliveryTypes = useAppSelector(state => state.orders.deliveryTypes);
  
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryTypeId, setDeliveryTypeId] = useState<number>(1);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (deliveryTypes.length === 0) {
      dispatch(fetchDeliveryTypes());
    }
  }, [dispatch, deliveryTypes.length]);

  const handleCheckout = () => {
    onCheckout({
      client,
      phone,
      deliveryService: deliveryTypeId.toString(),
      address: deliveryTypeId === 5 ? 'Самовывоз: Москва, ул. Примерная, 12' : address
    });
  };

  const isFormValid = client && phone && (deliveryTypeId === 5 || address);

  return (
    <Paper elevation={0} className="card-paper" sx={{ position: 'sticky', top: 100 }}>
      <Typography variant="h6" className="bold" sx={{ mb: 2 }}>
        Итого
      </Typography>
      
      <Box className={`${styles.summaryRow}`} sx={{ mb: 3 }}>
        <Typography color="text.primary">Товары: {count}</Typography>
        <Typography color="text.primary" className="bold">Сумма: {sum.toLocaleString()} ₽</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" className="bold" sx={{ mb: 2 }}>Доставка</Typography>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup 
            value={deliveryTypeId} 
            onChange={(e) => setDeliveryTypeId(Number(e.target.value))} 
            sx={{ gap: 2 }}
          >
            {deliveryTypes.map(dt => (
              <FormControlLabel 
                key={dt.id}
                value={dt.id} 
                control={<Radio size="small" />} 
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {dt.id === 5 ? "🏢" : "📦"} {dt.name}
                    </Typography>
                    {dt.id === 5 && (
                      <Box sx={{ mt: 1, p: 1, border: '1px solid #eee', borderRadius: 1, bgcolor: '#f9f9f9' }}>
                        <Typography variant="caption">Москва, ул. Примерная, 12</Typography>
                      </Box>
                    )}
                  </Box>
                } 
                sx={{ m: 0, alignItems: 'flex-start' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" className="bold" sx={{ mb: 2 }}>Контактные данные</Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField value={client} onChange={e => setClient(e.target.value)} size="small" fullWidth label="ФИО/Организация*" sx={{ bgcolor: 'white' }} />
          <TextField value={phone} onChange={e => setPhone(e.target.value)} size="small" fullWidth label="Телефон*" placeholder="+7 ___ ___ __ __" sx={{ bgcolor: 'white' }} />
          
          {deliveryTypeId !== 5 && (
            <TextField 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              size="small" 
              fullWidth 
              label="Адрес доставки*" 
              multiline 
              rows={2}
              placeholder="Город, улица, дом, квартира"
              sx={{ bgcolor: 'white' }} 
            />
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" className="bold" sx={{ mb: 1 }}>Оплата</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 0.5 }}>
          <CreditCardIcon sx={{ fontSize: 16 }} />
          При получении (наличные / карта)
        </Typography>
      </Box>

      <Button variant="contained" size="large" fullWidth disabled={disabled || !isFormValid} onClick={handleCheckout}>
        Оформить заказ
      </Button>
    </Paper>
  );
}

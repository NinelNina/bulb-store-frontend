import {
    Box, Typography, Paper, Button, Radio, RadioGroup,
    FormControlLabel, FormControl, Select, MenuItem, TextField, Divider
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

interface CartSummaryProps {
    count: number;
    sum: number;
    disabled: boolean;
}

export function CartSummary({ count, sum, disabled }: CartSummaryProps) {
    return (
        <Paper elevation={0} className="card-paper" sx={{ position: 'sticky', top: 100 }}>
            <Typography variant="h6" className="bold" sx={{ mb: 2 }}>
                Итого
            </Typography>

            <Box className="summary-row" sx={{ mb: 3 }}>
                <Typography color="text.primary">Товары: {count}</Typography>
                <Typography color="text.primary" className="bold">Сумма: {sum} ₽</Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" className="bold" sx={{ mb: 2 }}>Доставка</Typography>
                <FormControl component="fieldset" fullWidth>
                    <RadioGroup defaultValue="cdek" sx={{ gap: 2 }}>
                        <FormControlLabel
                            value="cdek"
                            control={<Radio size="small" />}
                            label={
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>📦 Сторонняя служба</Typography>
                                    <Select size="small" fullWidth defaultValue="cdek" sx={{ mt: 1, bgcolor: 'white' }}>
                                        <MenuItem value="cdek">СДЭК</MenuItem>
                                        <MenuItem value="post">Почта России</MenuItem>
                                    </Select>
                                </Box>
                            }
                            sx={{ m: 0, alignItems: 'flex-start' }}
                        />
                        <FormControlLabel
                            value="pickup"
                            control={<Radio size="small" />}
                            label={
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>🏢 Самовывоз</Typography>
                                    <Select size="small" fullWidth defaultValue="msk" sx={{ mt: 1, bgcolor: 'white' }}>
                                        <MenuItem value="msk">Москва, ул. Примерная, 12</MenuItem>
                                    </Select>
                                </Box>
                            }
                            sx={{ m: 0, alignItems: 'flex-start' }}
                        />
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" className="bold" sx={{ mb: 2 }}>Оплата</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <CreditCardIcon fontSize="small" />
                    Только при получении (наличные / карта / перевод)
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField size="small" fullWidth placeholder="ФИО/Организация*" sx={{ bgcolor: 'white' }} />
                    <TextField size="small" fullWidth placeholder="Телефон*: +7 ___ ___ __ __" sx={{ bgcolor: 'white' }} />
                </Box>
            </Box>

            <Button variant="contained" size="large" fullWidth disabled={disabled}>
                Оформить заказ
            </Button>
        </Paper>
    );
}

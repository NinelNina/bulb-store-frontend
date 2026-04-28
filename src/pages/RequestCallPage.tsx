import { 
  Box, Typography, Grid, Paper, TextField, Button, Checkbox, FormControlLabel
} from "@mui/material";

export function RequestCallPage() {
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
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>📞 Телефон*:</Typography>
                <TextField fullWidth size="small" placeholder="+7 ___ ___ __ __" required />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>✉️ Email:</Typography>
                <TextField fullWidth size="small" type="email" placeholder="mail@example.com" />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>🏢 ФИО / организация (для юр. лиц)*:</Typography>
                <TextField fullWidth size="small" placeholder="Иванов И.И." required />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>📝 Описание заказа / параметры лампы:</Typography>
                <TextField fullWidth multiline rows={4} placeholder="Опишите что необходимо..." />
              </Box>
              <FormControlLabel 
                control={<Checkbox required />} 
                label={<Typography variant="body2" color="text.secondary">Согласен на обработку данных для связи</Typography>} 
              />
              <Button type="submit" variant="contained" size="large">
                Отправить заявку
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

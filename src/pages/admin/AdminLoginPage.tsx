import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Typography, TextField, Button, Paper 
} from "@mui/material";

export function AdminLoginPage() {
  const [email, setEmail] = useState("admin@lampshop.ru");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 400, border: 1, borderColor: 'grey.200' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, fontWeight: 'bold' }}>
            <span>🔐</span> Вход
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Только для сотрудников магазина
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>✉️ Email / Логин</Typography>
            <TextField fullWidth size="small" value={email} onChange={e => setEmail(e.target.value)} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>🔑 Пароль</Typography>
            <TextField fullWidth size="small" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Box>
          <Button type="submit" variant="contained" size="large" fullWidth>
            Войти
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
          Забыли пароль? Обратитесь к системному администратору.
        </Typography>
      </Paper>
    </Box>
  );
}

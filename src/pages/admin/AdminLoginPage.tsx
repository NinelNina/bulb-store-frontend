import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, TextField, Button, Paper, Alert
} from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/authActions";

export function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin_password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await dispatch(login({ username, password }) as any);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Ошибка входа. Проверьте данные.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 400, border: 1, borderColor: 'grey.200' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, fontWeight: 'bold' }}>
              <span>🔐</span> Панель управления
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Авторизуйтесь для доступа к управлению
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>👤 Логин</Typography>
              <TextField fullWidth size="small" value={username} onChange={e => setUsername(e.target.value)} required />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>🔑 Пароль</Typography>
              <TextField fullWidth size="small" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
                {loading ? "Вход..." : "Войти"}
              </Button>
              <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={() => navigate("/")}
                  disabled={loading}
                  color="inherit"
              >
                Вернуться в магазин
              </Button>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
            Забыли пароль? Обратитесь к системному администратору.
          </Typography>
        </Paper>
      </Box>
  );
}

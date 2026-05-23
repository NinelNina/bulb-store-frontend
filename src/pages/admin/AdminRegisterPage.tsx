import { useState } from "react";
import {
    Box, Typography, TextField, Button, Paper, Alert, Snackbar
} from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { registerAdmin } from "../../redux/authActions";

export function AdminRegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен содержать не менее 6 символов");
            return;
        }

        setLoading(true);
        try {
            // Call registerAdmin action
            await dispatch(registerAdmin({ username, password }) as any);
            setSuccess(true);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            setError(err.message || "Ошибка регистрации. Возможно, имя пользователя уже занято.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: 1, borderColor: 'grey.200' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    📝 Регистрация администратора
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Создайте новую учетную запись администратора для доступа к этой панели управления
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>👤 Логин нового администратора</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Пример: admin2"
                            required
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>🔑 Пароль</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Минимум 6 символов"
                            required
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>🔒 Подтвердите пароль</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 1 }}
                    >
                        {loading ? "Регистрация..." : "Зарегистрировать"}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
                message="Новый администратор успешно зарегистрирован!"
            />
        </Box>
    );
}

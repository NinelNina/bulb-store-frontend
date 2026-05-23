import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, CircularProgress
} from "@mui/material";
import { useState, useEffect } from "react";
import { Category } from "../../types";

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (category: Partial<Category>) => Promise<void>;
    category?: Category | null;
}

export function CategoryModal({ open, onClose, onSave, category }: CategoryModalProps) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
        } else {
            setName("");
        }
    }, [category, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave({ name });
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{category ? "Редактировать категорию" : "Добавить категорию"}</DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ pt: 2, pb: 1 }}>
                        <TextField
                            label="Название категории"
                            fullWidth
                            size="small"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit">Отмена</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

import { 
  Box, Typography, CircularProgress, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPreorders, updatePreorderStatus } from "../../redux/adminActions";
import { api } from "../../services/api";

export function AdminPreordersPage() {
  const dispatch = useAppDispatch();
  const preorders = useAppSelector(state => state.admin.preorders);
  
  const [selectedPreorderId, setSelectedPreorderId] = useState<string | null>(null);
  const [preorderDetails, setPreorderDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPreorders() as any);
  }, [dispatch]);

  const handleStatusUpdate = async (id: string, statusId: number) => {
    try {
      await dispatch(updatePreorderStatus(id, statusId) as any);
      dispatch(fetchPreorders() as any);

      if (preorderDetails && preorderDetails.id === id) {
        setPreorderDetails({ ...preorderDetails, statusId: statusId, status_id: statusId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = async (id: string) => {
    setSelectedPreorderId(id);
    setDetailsDialogOpen(true);
    setLoadingDetails(true);
    try {
      const response = await api.get<any>(`/preorders/${id}`);
      setPreorderDetails(response);
    } catch (error) {
      console.error("Failed to load details", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeDialog = () => {
    setDetailsDialogOpen(false);
    setTimeout(() => {
      setPreorderDetails(null);
      setSelectedPreorderId(null);
    }, 300);
  }

  return (
    <Box className="flex-column" sx={{ gap: 4 }}>
      <Typography variant="h5" className="bold">Управление заявками (Предзаказы)</Typography>
      
      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'grey.200', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell className="bold">Дата</TableCell>
              <TableCell className="bold">Клиент</TableCell>
              <TableCell className="bold">Телефон</TableCell>
              <TableCell className="bold">Статус</TableCell>
              <TableCell className="bold" align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {preorders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  Заявок нет
                </TableCell>
              </TableRow>
            ) : (
              preorders.map((p) => (
                <TableRow key={p.id} hover sx={{ cursor: 'pointer' }} onClick={() => handleViewDetails(p.id)}>
                  <TableCell>{(p.createdAt || p.created_at) ? new Date(p.createdAt || p.created_at).toLocaleString() : '-'}</TableCell>
                  <TableCell>{p.customerName || p.customer_name || '-'}</TableCell>
                  <TableCell>{p.phoneNumber || p.phone_number}</TableCell>
                  <TableCell>
                    <Chip 
                      label={p.status?.name || p.status_name || (p.statusId === 1 || p.status_id === 1 ? 'Новая' : 'Завершена')} 
                      color={p.statusId === 1 || p.status_id === 1 ? "error" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Смотреть детали">
                      <IconButton size="small" color="primary" onClick={(e) => { e.stopPropagation(); handleViewDetails(p.id); }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {(p.statusId === 1 || p.status_id === 1) && (
                      <Tooltip title="Отметить как обработанную">
                        <IconButton size="small" color="success" onClick={(e) => { e.stopPropagation(); handleStatusUpdate(p.id, 2); }}>
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={detailsDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>Детали заявки</DialogTitle>
        <DialogContent dividers>
          {loadingDetails ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : preorderDetails ? (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">ID заявки</Typography>
                <Typography variant="body1" gutterBottom>{preorderDetails.id}</Typography>

                <Typography variant="subtitle2" color="text.secondary">Клиент</Typography>
                <Typography variant="body1" gutterBottom>{preorderDetails.customerName || preorderDetails.customer_name || '-'}</Typography>

                <Typography variant="subtitle2" color="text.secondary">Телефон</Typography>
                <Typography variant="body1" gutterBottom>{preorderDetails.phoneNumber || preorderDetails.phone_number || '-'}</Typography>

                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body1" gutterBottom>{preorderDetails.email || '-'}</Typography>

                <Typography variant="subtitle2" color="text.secondary">Дата создания</Typography>
                <Typography variant="body1" gutterBottom>
                  {(preorderDetails.createdAt || preorderDetails.created_at) ? new Date(preorderDetails.createdAt || preorderDetails.created_at).toLocaleString() : '-'}
                </Typography>
                 
                <Typography variant="subtitle2" color="text.secondary">Статус</Typography>
                <Chip 
                  label={preorderDetails.status?.name || preorderDetails.status_name || (preorderDetails.statusId === 1 || preorderDetails.status_id === 1 ? 'Новая' : 'Завершена')} 
                  color={preorderDetails.statusId === 1 || preorderDetails.status_id === 1 ? "error" : "success"}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>Информация</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                  {preorderDetails.is_constructor || preorderDetails.base || preorderDetails.power ? (
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {preorderDetails.description && <li><strong>Описание:</strong> {preorderDetails.description}</li>}
                      {preorderDetails.base && <li><strong>Цоколь:</strong> {preorderDetails.base}</li>}
                      {preorderDetails.power && <li><strong>Мощность:</strong> {preorderDetails.power} Вт</li>}
                      {preorderDetails.temp && <li><strong>Свечение:</strong> {preorderDetails.temp}</li>}
                      {preorderDetails.brightness && <li><strong>Яркость:</strong> {preorderDetails.brightness} лм</li>}
                      {preorderDetails.shape && <li><strong>Форма:</strong> {preorderDetails.shape}</li>}
                      {preorderDetails.count && <li><strong>Количество:</strong> {preorderDetails.count} шт.</li>}
                    </Box>
                  ) : (
                    <Typography variant="body1">
                      {preorderDetails.description || 'Описание отсутствует'}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          ) : (
             <Typography color="error">Не удалось загрузить детали заявки.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {preorderDetails && (preorderDetails.statusId === 1 || preorderDetails.status_id === 1) && (
            <Button color="success" variant="contained" onClick={() => handleStatusUpdate(preorderDetails.id, 2)}>
              Отметить обработанной
            </Button>
          )}
          <Button onClick={closeDialog}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

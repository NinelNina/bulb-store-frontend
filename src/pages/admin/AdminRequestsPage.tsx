import { mockRequests } from "../../data/mock";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Button 
} from "@mui/material";

export function AdminRequestsPage() {
  return (
    <Box className="flex-column" sx={{ gap: 4 }}>
      <Typography variant="h5" className="bold">Заявки на звонок и предзаказ</Typography>

      <TableContainer component={Paper} elevation={0} className="card-paper" sx={{ p: '0 !important', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead className="table-header">
            <TableRow>
              <TableCell className="table-header-cell">Телефон</TableCell>
              <TableCell className="table-header-cell">Имя / Организация</TableCell>
              <TableCell className="table-header-cell">Описание / Параметры</TableCell>
              <TableCell align="center" className="table-header-cell">Статус</TableCell>
              <TableCell align="center" className="table-header-cell">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell component="th" scope="row" className="medium">{req.phone}</TableCell>
                <TableCell color="text.secondary">{req.client}</TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2">
                    {req.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={req.status} 
                    size="small"
                    color={req.status === 'Новая' ? 'info' : 'success'}
                    sx={{ borderRadius: 1, minWidth: 80 }}
                  />
                </TableCell>
                <TableCell align="center">
                  {req.status === 'Новая' ? (
                    <Button variant="contained" size="small" sx={{ minWidth: 100 }}>
                      Перезвонил
                    </Button>
                  ) : (
                    <Typography variant="body2" color="text.secondary" className="clickable-link">
                      Архив
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

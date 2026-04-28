import {
  Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from "@mui/material";

interface Product {
  id: string;
  name: string;
  model: string;
  price: number;
  stock: number;
  purpose: string[];
}

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
      <TableContainer component={Paper} elevation={0} className="card-paper" sx={{ p: '0 !important', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead className="table-header">
            <TableRow>
              <TableCell className="table-header-cell">Название</TableCell>
              <TableCell className="table-header-cell">Артикул</TableCell>
              <TableCell className="table-header-cell">Цена (₽)</TableCell>
              <TableCell className="table-header-cell">Остаток</TableCell>
              <TableCell className="table-header-cell">Категория</TableCell>
              <TableCell className="table-header-cell">Статус</TableCell>
              <TableCell align="right" className="table-header-cell">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="medium">{product.name}</TableCell>
                  <TableCell color="text.secondary">{product.model}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color={product.stock < 10 ? 'error.main' : 'success.main'} className="medium">
                      {product.stock}
                    </Typography>
                  </TableCell>
                  <TableCell color="text.secondary">{product.purpose[0]}</TableCell>
                  <TableCell color="text.secondary">{product.stock < 10 ? 'Мало' : 'Активен'}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" className="clickable-link" component="span">
                      Изменить
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="span" sx={{ mx: 1 }}>
                      |
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="span" sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' } }}>
                      Скрыть
                    </Typography>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

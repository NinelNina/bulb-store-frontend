import { 
  Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow
} from "@mui/material";
import styles from './ProductsTable.module.css';
import { Product } from "../../types";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} className="card-paper" sx={{ p: '0 !important', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead className={`${styles.tableHeader}`}>
          <TableRow>
            <TableCell className={`${styles.tableHeaderCell}`}>Название</TableCell>
            <TableCell className={`${styles.tableHeaderCell}`}>Артикул</TableCell>
            <TableCell className={`${styles.tableHeaderCell}`}>Цена (₽)</TableCell>
            <TableCell className={`${styles.tableHeaderCell}`}>Остаток</TableCell>
            <TableCell className={`${styles.tableHeaderCell}`}>Форма</TableCell>
            <TableCell className={`${styles.tableHeaderCell}`}>Статус</TableCell>
            <TableCell align="right" className={`${styles.tableHeaderCell}`}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="medium">{product.name}</TableCell>
              <TableCell color="text.secondary">{product.id.split('-')[0].toUpperCase()}</TableCell>
              <TableCell>{Number(product.price).toLocaleString()}</TableCell>
              <TableCell>
                <Typography variant="body2" color={product.quantity < 10 ? 'error.main' : 'success.main'} className="medium">
                  {product.quantity}
                </Typography>
              </TableCell>
              <TableCell color="text.secondary">{product.shape}</TableCell>
              <TableCell sx={{ color: product.quantity === 0 ? 'error.main' : 'text.secondary' }}>
                {product.quantity === 0 ? 'Нет на складе' : (product.quantity < 10 ? 'Мало' : 'В наличии')}
              </TableCell>
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

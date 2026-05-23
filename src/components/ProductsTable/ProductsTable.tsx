import {
  Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from './ProductsTable.module.css';
import { Product } from "../../types";

interface ProductsTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  return (
      <TableContainer component={Paper} elevation={0} className="card-paper" sx={{ p: '0 !important', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead className={`${styles.tableHeader}`}>
            <TableRow>
              <TableCell className={`${styles.tableHeaderCell}`}>Название</TableCell>
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
                    <IconButton
                        size="small"
                        onClick={() => onEdit?.(product)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete?.(product.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

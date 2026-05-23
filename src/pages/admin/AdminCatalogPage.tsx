import {
  Box, Typography, Button, CircularProgress, Tabs, Tab,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsTable } from "../../components/ProductsTable/ProductsTable";
import { ProductModal } from "../../components/ProductModal/ProductModal";
import { CategoryModal } from "../../components/CategoryModal/CategoryModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct,
  createCategory, updateCategory, deleteCategory
} from "../../redux/productActions";
import { useEffect, useState } from "react";
import { Product, Category } from "../../types";

export function AdminCatalogPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const categories = useAppSelector(state => state.products.categories);
  const status = useAppSelector(state => state.products.status);

  const [tab, setTab] = useState(0);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    if (selectedProduct) {
      await dispatch(updateProduct(selectedProduct.id, productData) as any);
    } else {
      await dispatch(createProduct(productData) as any);
    }
    dispatch(fetchProducts());
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Удалить этот товар?")) {
      await dispatch(deleteProduct(id) as any);
      dispatch(fetchProducts());
    }
  };

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    if (selectedCategory) {
      await dispatch(updateCategory(selectedCategory.id, categoryData) as any);
    } else {
      await dispatch(createCategory(categoryData) as any);
    }
    dispatch(fetchCategories());
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Удалить эту категорию?")) {
      await dispatch(deleteCategory(id) as any);
      dispatch(fetchCategories());
    }
  };

  return (
      <Box className="flex-column" sx={{ gap: 4 }}>
        <Box className="flex-between">
          <Typography variant="h5" className="bold">Управление каталогом</Typography>
          <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={tab === 0 ? handleCreateProduct : handleCreateCategory}
          >
            {tab === 0 ? "Добавить товар" : "Добавить категорию"}
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Товары" />
            <Tab label="Категории" />
          </Tabs>
        </Box>

        {status === 'loading' ? (
            <CircularProgress />
        ) : (
            <>
              {tab === 0 ? (
                  <ProductsTable
                      products={products}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                  />
              ) : (
                  <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'grey.200', borderRadius: 2 }}>
                    <Table>
                      <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                          <TableCell className="bold">Название</TableCell>
                          <TableCell className="bold" align="right">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat.id}>
                              <TableCell className="medium">{cat.name}</TableCell>
                              <TableCell align="right">
                                <IconButton size="small" onClick={() => handleEditCategory(cat)}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDeleteCategory(cat.id)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              )}
            </>
        )}

        <ProductModal
            open={productModalOpen}
            onClose={() => setProductModalOpen(false)}
            onSave={handleSaveProduct}
            product={selectedProduct}
            categories={categories}
        />

        <CategoryModal
            open={categoryModalOpen}
            onClose={() => setCategoryModalOpen(false)}
            onSave={handleSaveCategory}
            category={selectedCategory}
        />
      </Box>
  );
}


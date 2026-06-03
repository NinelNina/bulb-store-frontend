import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts, fetchCategories } from "../redux/productActions";
import { 
  Box, Typography, TextField, InputAdornment, Grid, Paper, Pagination
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { CatalogFilters, FilterState } from "../components/CatalogFilters/CatalogFilters";
import { useSearchParams } from "react-router-dom";
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    base: '',
    minPower: '',
    maxPower: '',
    color: '',
    minBrightness: '',
    maxBrightness: '',
    minPrice: '',
    maxPrice: '',
    shape: ''
  });

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const categories = useAppSelector(state => state.products.categories);
  const status = useAppSelector(state => state.products.status);

  const [facets, setFacets] = useState({
    bases: [] as string[],
    shapes: [] as string[],
    colors: [] as string[]
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ size: 200 })).then((res: any) => {
      if (res && Array.isArray(res)) {
        setFacets({
          bases: Array.from(new Set(res.map((p: any) => p.socket).filter(Boolean))),
          shapes: Array.from(new Set(res.map((p: any) => p.shape).filter(Boolean))),
          colors: Array.from(new Set(res.map((p: any) => String(p.color_temperature)).filter(Boolean)))
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const apiParams: any = {
      page: page,
      size: itemsPerPage,
      q: search || undefined,
      categoryId: filters.category || undefined,
      socket: filters.base || undefined,
      minPower: filters.minPower ? parseInt(filters.minPower) : undefined,
      maxPower: filters.maxPower ? parseInt(filters.maxPower) : undefined,
      minBrightness: filters.minBrightness ? parseInt(filters.minBrightness) : undefined,
      maxBrightness: filters.maxBrightness ? parseInt(filters.maxBrightness) : undefined,
      minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
      colorTemperature: filters.color ? parseInt(filters.color) : undefined,
      shape: filters.shape || undefined,
    };

    Object.keys(apiParams).forEach(key => apiParams[key] === undefined && delete apiParams[key]);

    dispatch(fetchProducts(apiParams));
  }, [dispatch, search, filters, page]);

  useEffect(() => {
    const categoryQuery = searchParams.get('category');
    if (categoryQuery && categories.length > 0) {
      const exists = categories.find(c => c.id === categoryQuery);
      if (exists) {
        setFilters(prev => ({ ...prev, category: categoryQuery }));
      }
    }
  }, [searchParams, categories]);

  const currentProducts = products;
  const totalPages = products.length === itemsPerPage ? page + 1 : page;

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Box className={`${styles.catalogContainer}`}>
      <Box className={`${styles.catalogSidebar}`}>
        <CatalogFilters 
          filters={filters} 
          onChange={handleFiltersChange} 
          categories={categories}
          availableBases={facets.bases}
          availableShapes={facets.shapes}
          availableColors={facets.colors}
        />
      </Box>

      <Box className={`${styles.catalogMain}`}>
        <Paper elevation={0} className={`${styles.catalogHero}`}>
          <Typography variant="h5" color="text.primary" gutterBottom className="bold">
            Энергосберегающие решения
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Принесите старую лампу → изготовим современный аналог. Работаем с физ. и юр. лицами.
          </Typography>
        </Paper>

        <Box className="flex-column" sx={{ gap: 2 }}>
          <Box className={`${styles.catalogTabs}`}>

          </Box>

          <TextField
            fullWidth
            placeholder="Поиск: led, e27, 12w..."
            value={search}
            onChange={handleSearchChange}
            className={`${styles.searchField}`}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box>
          <Typography variant="h6" className="bold mb-3">
            Каталог товаров
          </Typography>
          
          {currentProducts.length > 0 ? (
            <div style={{ width: '100%' }}>
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <Box className="flex-center" sx={{ py: 8, flexDirection: 'column' }}>
              <Typography variant="h6" color="text.secondary">По вашему запросу ничего не найдено</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Попробуйте изменить фильтры или условия поиска</Typography>
            </Box>
          )}
          
          {totalPages > 1 && (
            <Box className="flex-center" sx={{ mt: 6 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(_, value) => setPage(value)} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}


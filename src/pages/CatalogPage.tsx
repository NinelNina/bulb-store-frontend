import { useState, useEffect } from "react";
import { mockProducts } from "../data/mock";
import {
  Box, Typography, TextField, InputAdornment, Grid, Paper, Pagination
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { CatalogFilters, FilterState } from "../components/CatalogFilters/CatalogFilters";
import { useSearchParams } from "react-router-dom";

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    bases: [],
    power: 'any',
    colors: [],
    brightness: 'any',
    shapes: [],
    purposes: []
  });

  useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'home') {
      setFilters(prev => ({ ...prev, purposes: ['Дом'], bases: ['E27', 'E14'] }));
    } else if (category === 'industrial') {
      setFilters(prev => ({ ...prev, purposes: ['Производство'], bases: ['G13'] }));
    }
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  // Filter logic
  const filteredProducts = mockProducts.filter(p => {
    // Search
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;

    // Purposes
    if (filters.purposes.length > 0 && !p.purpose.some(purpose => filters.purposes.includes(purpose))) return false;

    // Types
    if (filters.types.length > 0 && !filters.types.includes(p.type)) return false;

    // Bases
    if (filters.bases.length > 0 && !filters.bases.includes(p.base)) return false;

    // Power
    if (filters.power !== 'any') {
      const maxPower = parseInt(filters.power);
      if (p.power > maxPower) return false;
    }

    // Colors
    if (filters.colors.length > 0 && !filters.colors.includes(p.colorTemp)) return false;

    // Brightness
    if (filters.brightness !== 'any') {
      const maxBrightness = parseInt(filters.brightness);
      if (p.brightness > maxBrightness) return false;
    }

    // Shapes
    if (filters.shapes.length > 0 && !filters.shapes.includes(p.shape)) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset page when filters or search change
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
      <Box className="catalog-container">
        {/* Left Column: Filters sidebar */}
        <Box className="catalog-sidebar">
          <CatalogFilters filters={filters} onChange={handleFiltersChange} />
        </Box>

        {/* Right Column: Search + Content */}
        <Box className="catalog-main">
          {/* Hero / Header */}
          <Paper elevation={0} className="catalog-hero">
            <Typography variant="h5" color="text.primary" gutterBottom className="bold">
              Энергосберегающие решения
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Принесите старую лампу → изготовим современный аналог. Работаем с физ. и юр. лицами.
            </Typography>
          </Paper>

          {/* Search & Categories */}
          <Box className="flex-column" sx={{ gap: 2 }}>
            <Box className="catalog-tabs">
              {[
                { id: 'all', label: 'Все товары' },
                { id: 'home', label: 'Дом (E27, E14)' },
                { id: 'industrial', label: 'Производство (G13)' },
              ].map(cat => {
                const isActive = (searchParams.get('category') === cat.id) || (cat.id === 'all' && !searchParams.get('category'));
                return (
                    <Paper
                        key={cat.id}
                        elevation={0}
                        className={`catalog-tab ${isActive ? 'catalog-tab-active' : ''}`}
                        onClick={() => {
                          if (cat.id === 'all') {
                            setSearchParams({});
                            setFilters({
                              types: [],
                              bases: [],
                              power: 'any',
                              colors: [],
                              brightness: 'any',
                              shapes: [],
                              purposes: []
                            });
                          } else {
                            setSearchParams({ category: cat.id });
                          }
                        }}
                    >
                      {cat.label}
                    </Paper>
                );
              })}
            </Box>

            <TextField
                fullWidth
                placeholder="Поиск: led, e27, 12w..."
                value={search}
                onChange={handleSearchChange}
                className="search-field"
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


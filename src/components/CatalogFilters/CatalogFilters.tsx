import {
    Box, Typography, Radio, RadioGroup, FormControlLabel, TextField, Paper, FormControl
} from "@mui/material";
import styles from './CatalogFilters.module.css';
import { Category } from "../../types";

export interface FilterState {
    category: string;
    base: string;
    minPower: string;
    maxPower: string;
    color: string;
    minBrightness: string;
    maxBrightness: string;
    minPrice: string;
    maxPrice: string;
    shape: string;
}

interface CatalogFiltersProps {
    filters: FilterState;
    onChange: (newFilters: FilterState) => void;
    categories?: Category[];
    availableBases?: string[];
    availableShapes?: string[];
    availableColors?: string[];
}

export function CatalogFilters({
                                   filters,
                                   onChange,
                                   categories = [],
                                   availableBases = [],
                                   availableShapes = [],
                                   availableColors = []
                               }: CatalogFiltersProps) {

    const handleRadio = (category: keyof FilterState, value: string) => {
        onChange({ ...filters, [category]: value });
    };

    return (
        <Paper elevation={0} className={`${styles.catalogFilters} card-paper`}>
            <Typography variant="h6" className="bold mb-3">
                Фильтры
            </Typography>

            {categories.length > 0 && (
                <Box className={`${styles.filterSection}`}>
                    <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Категория:</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={filters.category}
                            onChange={(e) => handleRadio("category", e.target.value)}
                        >
                            <FormControlLabel value="" control={<Radio size="small" />} label={<Typography variant="body2">Все категории</Typography>} />
                            {categories.map(cat => (
                                <FormControlLabel
                                    key={cat.id}
                                    value={cat.id}
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2">{cat.name}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            )}

            <Box className={`${styles.filterSection}`}>
                <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Цена (₽):</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="От"
                        value={filters.minPrice}
                        onChange={e => onChange({ ...filters, minPrice: e.target.value })}
                        sx={{ bgcolor: 'white' }}
                    />
                    <Typography variant="caption">—</Typography>
                    <TextField
                        size="small"
                        placeholder="До"
                        value={filters.maxPrice}
                        onChange={e => onChange({ ...filters, maxPrice: e.target.value })}
                        sx={{ bgcolor: 'white' }}
                    />
                </Box>
            </Box>

            {availableBases.length > 0 && (
                <Box className={`${styles.filterSection}`}>
                    <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Цоколь:</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={filters.base}
                            onChange={(e) => handleRadio("base", e.target.value)}
                        >
                            <FormControlLabel value="" control={<Radio size="small" />} label={<Typography variant="body2">Любой</Typography>} />
                            {availableBases.map(val => (
                                <FormControlLabel
                                    key={val}
                                    value={val}
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2">{val}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            )}

            <Box className={`${styles.filterSection}`}>
                <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Мощность (Вт):</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="От"
                        value={filters.minPower}
                        onChange={e => onChange({ ...filters, minPower: e.target.value })}
                        sx={{ bgcolor: 'white' }}
                    />
                    <Typography variant="caption">—</Typography>
                    <TextField
                        size="small"
                        placeholder="До"
                        value={filters.maxPower}
                        onChange={e => onChange({ ...filters, maxPower: e.target.value })}
                        sx={{ bgcolor: 'white' }}
                    />
                </Box>
            </Box>

            {availableColors.length > 0 && (
                <Box className={`${styles.filterSection}`}>
                    <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Цвет. температура:</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={filters.color}
                            onChange={(e) => handleRadio("color", e.target.value)}
                        >
                            <FormControlLabel value="" control={<Radio size="small" />} label={<Typography variant="body2">Любой</Typography>} />
                            {availableColors.map(val => (
                                <FormControlLabel
                                    key={val}
                                    value={val}
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2">{val}K</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            )}

            <Box className={`${styles.filterSection}`}>
                <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Яркость (Лм):</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="От"
                        value={filters.minBrightness}
                        onChange={e => onChange({ ...filters, minBrightness: e.target.value })}
                        sx={{ bgcolor: 'white' }}
                    />
                    <Typography variant="caption">—</Typography>
                    <TextField
                        size="small"
                        placeholder="До"
                        value={filters.maxBrightness}
                        onChange={e => onChange({ ...filters, maxBrightness: e.target.value })}
                        sx={{ bgcolor: 'white' }}
                    />
                </Box>
            </Box>

            {availableShapes.length > 0 && (
                <Box className={`${styles.filterSection}`}>
                    <Typography variant="body2" color="text.secondary" className={`medium ${styles.filterLabel}`}>Форма:</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={filters.shape}
                            onChange={(e) => handleRadio("shape", e.target.value)}
                        >
                            <FormControlLabel value="" control={<Radio size="small" />} label={<Typography variant="body2">Любая</Typography>} />
                            {availableShapes.map(val => (
                                <FormControlLabel
                                    key={val}
                                    value={val}
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2">{val}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            )}
        </Paper>
    );
}


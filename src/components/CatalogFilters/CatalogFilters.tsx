import {
    Box, Typography, Checkbox, FormControlLabel, FormGroup, Select, MenuItem, Paper
} from "@mui/material";

export interface FilterState {
    types: string[];
    bases: string[];
    power: string;
    colors: string[];
    brightness: string;
    shapes: string[];
    purposes: string[];
}

interface CatalogFiltersProps {
    filters: FilterState;
    onChange: (newFilters: FilterState) => void;
}

export function CatalogFilters({ filters, onChange }: CatalogFiltersProps) {

    const handleCheckbox = (category: keyof FilterState, value: string, checked: boolean) => {
        const list = filters[category] as string[];
        const newList = checked ? [...list, value] : list.filter(item => item !== value);
        onChange({ ...filters, [category]: newList });
    };

    return (
        <Paper elevation={0} className="catalog-filters card-paper">
            <Typography variant="h6" className="bold mb-3">
                Фильтры
            </Typography>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Назначение:</Typography>
                <FormGroup className="filter-group">
                    {["Дом", "Офис", "Производство", "Магазин", "Улица"].map(val => (
                        <FormControlLabel
                            key={val}
                            control={<Checkbox size="small" checked={filters.purposes.includes(val)} onChange={(e) => handleCheckbox("purposes", val, e.target.checked)} />}
                            label={<Typography variant="body2">{val}</Typography>}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Тип лампочки:</Typography>
                <FormGroup className="filter-group">
                    {["LED", "Люминесцентная", "Галогенная"].map(val => (
                        <FormControlLabel
                            key={val}
                            control={<Checkbox size="small" checked={filters.types.includes(val)} onChange={(e) => handleCheckbox("types", val, e.target.checked)} />}
                            label={<Typography variant="body2">{val}</Typography>}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Цоколь:</Typography>
                <FormGroup className="filter-group">
                    {["E27", "E14", "GU10", "G13", "GU5.3"].map(val => (
                        <FormControlLabel
                            key={val}
                            control={<Checkbox size="small" checked={filters.bases.includes(val)} onChange={(e) => handleCheckbox("bases", val, e.target.checked)} />}
                            label={<Typography variant="body2">{val}</Typography>}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Мощность (Вт):</Typography>
                <Select size="small" fullWidth value={filters.power} onChange={e => onChange({ ...filters, power: e.target.value })}>
                    <MenuItem value="any">Любая</MenuItem>
                    <MenuItem value="10">до 10 Вт</MenuItem>
                    <MenuItem value="12">до 12 Вт</MenuItem>
                    <MenuItem value="15">до 15 Вт</MenuItem>
                    <MenuItem value="100">до 100 Вт</MenuItem>
                </Select>
            </Box>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Цвет. температура:</Typography>
                <FormGroup className="filter-group">
                    {["3000K", "4000K", "5000K"].map(val => (
                        <FormControlLabel
                            key={val}
                            control={<Checkbox size="small" checked={filters.colors.includes(val)} onChange={(e) => handleCheckbox("colors", val, e.target.checked)} />}
                            label={<Typography variant="body2">{val}</Typography>}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Яркость (Лм):</Typography>
                <Select size="small" fullWidth value={filters.brightness} onChange={e => onChange({ ...filters, brightness: e.target.value })}>
                    <MenuItem value="any">Любая</MenuItem>
                    <MenuItem value="500">до 500 Лм</MenuItem>
                    <MenuItem value="1000">до 1000 Лм</MenuItem>
                    <MenuItem value="1500">до 1500 Лм</MenuItem>
                </Select>
            </Box>

            <Box className="filter-section">
                <Typography variant="body2" color="text.secondary" className="medium filter-label">Форма:</Typography>
                <FormGroup className="filter-group">
                    {["A60", "Свеча", "Шар", "Спот", "Трубка"].map(val => (
                        <FormControlLabel
                            key={val}
                            control={<Checkbox size="small" checked={filters.shapes.includes(val)} onChange={(e) => handleCheckbox("shapes", val, e.target.checked)} />}
                            label={<Typography variant="body2">{val}</Typography>}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Paper>
    );
}


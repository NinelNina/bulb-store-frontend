import { 
  Box, Typography, Select, MenuItem, TextField, FormControl, Grid
} from "@mui/material";

interface ConstructorFormProps {
  base: string;
  setBase: (val: string) => void;
  power: string;
  setPower: (val: string) => void;
  temp: string;
  setTemp: (val: string) => void;
  brightness: string;
  setBrightness: (val: string) => void;
  shape: string;
  setShape: (val: string) => void;
  count: string;
  setCount: (val: string) => void;
}

export function ConstructorForm({
  base, setBase,
  power, setPower,
  temp, setTemp,
  brightness, setBrightness,
  shape, setShape,
  count, setCount
}: ConstructorFormProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>Цоколь:</Typography>
          <Select 
            size="small" 
            fullWidth 
            value={base} 
            onChange={(e) => setBase(e.target.value)}
          >
            {["E27", "E14", "GU10"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </Box>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>Мощность (Вт):</Typography>
          <TextField 
            size="small" 
            fullWidth 
            type="number"
            value={power} 
            onChange={(e) => setPower(e.target.value)}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>Цвет. температура:</Typography>
          <Select 
            size="small" 
            fullWidth 
            value={temp} 
            onChange={(e) => setTemp(e.target.value)}
          >
            {["3000K", "4000K", "5000K"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>Яркость (Лм):</Typography>
          <TextField 
            size="small" 
            fullWidth 
            type="number"
            value={brightness} 
            onChange={(e) => setBrightness(e.target.value)}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>Форма:</Typography>
          <Select 
            size="small" 
            fullWidth 
            value={shape} 
            onChange={(e) => setShape(e.target.value)}
          >
            {["A60", "Свеча", "Шар"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>Кол-во (шт):</Typography>
          <TextField 
            size="small" 
            fullWidth 
            type="number"
            value={count} 
            onChange={(e) => setCount(e.target.value)}
            slotProps={{
              input: { inputProps: { min: 10 } }
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

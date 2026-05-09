import { useState } from "react";
import { 
  Box, Typography, Grid, Paper
} from "@mui/material";
import { ConstructorForm } from "../components/ConstructorForm/ConstructorForm";
import { ConstructorSummary } from "../components/ConstructorSummary/ConstructorSummary";

export function ConstructorPage() {
  const [base, setBase] = useState("E27");
  const [power, setPower] = useState("12");
  const [temp, setTemp] = useState("4000K");
  const [brightness, setBrightness] = useState("1000");
  const [shape, setShape] = useState("A60");
  const [count, setCount] = useState("50");

  const total = 380 * (parseInt(count) || 0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom className="section-title">
        Конструктор ламп
      </Typography>
      <Typography variant="body1" className="text-danger" sx={{ mb: 3 }}>
        Услуга предоставляется только для юр. лиц или оптовых заказов
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
        Укажите параметры → получите расчет стоимости. Мин. партия: 10 шт.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} className="card-paper">
            <Typography variant="h6" className="hero-title">
              Параметры изделия
            </Typography>
            <ConstructorForm 
              base={base} setBase={setBase}
              power={power} setPower={setPower}
              temp={temp} setTemp={setTemp}
              brightness={brightness} setBrightness={setBrightness}
              shape={shape} setShape={setShape}
              count={count} setCount={setCount}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} className="card-paper" sx={{ position: 'sticky', top: 100 }}>
            <ConstructorSummary total={total} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}


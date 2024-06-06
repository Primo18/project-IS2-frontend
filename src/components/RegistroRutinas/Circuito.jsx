import React from 'react';
import { Grid, TextField, Button, Card, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Ejercicio from './Ejercicio';
import { v4 as uuidv4 } from 'uuid';

function Circuito({ circuito, circuitoIndex, setCircuitos, dataEj }) {
  const addRowEj = (circuitoId) => {
    setCircuitos((prev) =>
      prev.map((circuito) =>
        circuito.id === circuitoId
          ? { ...circuito, ejercicios: [...circuito.ejercicios, { id: uuidv4(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' }] }
          : circuito
      )
    );
  };

  const deleteCircuito = (id) => {
    setCircuitos((prev) => prev.filter((circuito) => circuito.id !== id));
  };

  const handleCircuitoChange = (circuitoId, field, value) => {
    setCircuitos((prev) =>
      prev.map((circuito) =>
        circuito.id === circuitoId ? { ...circuito, [field]: value } : circuito
      )
    );
  };

  return (
    <Card variant="outlined" sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6">Circuito {circuitoIndex + 1}</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Puntuación"
            type="number"
            value={circuito.puntuacion}
            onChange={(e) => handleCircuitoChange(circuito.id, 'puntuacion', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={circuito.puntuacionError}
            helperText={circuito.puntuacionError ? 'Campo requerido' : ''}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Repeticiones"
            type="number"
            value={circuito.repeticiones}
            onChange={(e) => handleCircuitoChange(circuito.id, 'repeticiones', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={circuito.repeticionesError}
            helperText={circuito.repeticionesError ? 'Campo requerido' : ''}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Observaciones"
            value={circuito.observaciones}
            onChange={(e) => handleCircuitoChange(circuito.id, 'observaciones', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={circuito.observacionesError}
            helperText={circuito.observacionesError ? 'Campo requerido' : ''}
            disabled
          />
        </Grid>
      </Grid>

      {circuito.ejercicios.map((ejercicio, ejercicioIndex) => (
        <Ejercicio
          key={ejercicio.id}
          ejercicio={ejercicio}
          ejercicioIndex={ejercicioIndex}
          circuitoId={circuito.id}
          setCircuitos={setCircuitos}
          dataEj={dataEj}
        />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addRowEj(circuito.id)}
          sx={{ bgcolor: '#EC9C00', '&:hover': { bgcolor: '#C68100' }, color: '#000000' }}
        >
          Agregar ejercicio
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteCircuito(circuito.id)} sx={{ ml: 2 }}>
          Eliminar
        </Button>
      </Box>
    </Card>
  );
}

export default Circuito;
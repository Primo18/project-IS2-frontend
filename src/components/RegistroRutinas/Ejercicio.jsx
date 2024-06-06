import React from 'react';
import { Grid, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';

function Ejercicio({ ejercicio, ejercicioIndex, circuitoId, setCircuitos, dataEj }) {
  const handleExerciseChange = (circuitoId, exerciseId, field, value) => {
    setCircuitos((prev) =>
      prev.map((circuito) =>
        circuito.id === circuitoId
          ? {
              ...circuito,
              ejercicios: circuito.ejercicios.map((ejercicio) =>
                ejercicio.id === exerciseId ? { ...ejercicio, [field]: value } : ejercicio
              ),
            }
          : circuito
      )
    );
  };

  const deleteExercise = (circuitoId, ejercicioId) => {
    setCircuitos((prev) =>
      prev.map((circuito) =>
        circuito.id === circuitoId
          ? { ...circuito, ejercicios: circuito.ejercicios.filter((ejercicio) => ejercicio.id !== ejercicioId) }
          : circuito
      )
    );
  };

  return (
    <Grid container spacing={2} key={ejercicio.id} sx={{ mb: 3 }} alignItems="center">
      <Grid item xs={12} sm={3}>
        <Autocomplete
          options={dataEj}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Ejercicio" error={ejercicio.ejercicioError} helperText={ejercicio.ejercicioError ? 'Campo requerido' : ''} />
          )}
          onChange={(event, newValue) => handleExerciseChange(circuitoId, ejercicio.id, 'ejercicio', newValue)}
          fullWidth
          isOptionEqualToValue={(option, value) => option.id === value.id} // Asegurarse de comparar por un campo único
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Series"
          type="number"
          value={ejercicio.series}
          onChange={(e) => handleExerciseChange(circuitoId, ejercicio.id, 'series', e.target.value)}
          fullWidth
          error={ejercicio.seriesError}
          helperText={ejercicio.seriesError ? 'Campo requerido' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Frecuencia"
          value={ejercicio.frecuencia}
          onChange={(e) => handleExerciseChange(circuitoId, ejercicio.id, 'frecuencia', e.target.value)}
          fullWidth
          error={ejercicio.frecuenciaError}
          helperText={ejercicio.frecuenciaError ? 'Campo requerido' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Orden"
          type="number"
          value={ejercicio.orden}
          onChange={(e) => handleExerciseChange(circuitoId, ejercicio.id, 'orden', e.target.value)}
          fullWidth
          error={ejercicio.ordenError}
          helperText={ejercicio.ordenError ? 'Campo requerido' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Descanso"
          value={ejercicio.descanso}
          onChange={(e) => handleExerciseChange(circuitoId, ejercicio.id, 'descanso', e.target.value)}
          fullWidth
          error={ejercicio.descansoError}
          helperText={ejercicio.descansoError ? 'Campo requerido' : ''}
        />
      </Grid>

      <Grid item xs={12} sm={1}>
        <IconButton color="secondary" onClick={() => deleteExercise(circuitoId, ejercicio.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      {/* Add more inputs for frecuencia, orden, and descanso similar to above if needed */}
    </Grid>
  );
}

export default Ejercicio;
import { Grid, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

function EjercicioEditar({ ejercicio, circuitoId, setCircuitos, dataEj }) {
  const handleExerciseChange = (circuitoId, exerciseId, field, value) => {
    console.log(circuitoId, exerciseId, field, value);
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
  const handleExerciseSelect = (circuitoId, exerciseId, newValue) => {
    console.log(circuitoId, exerciseId, newValue);
    setCircuitos((prev) =>
      prev.map((circuito) =>
        circuito.id === circuitoId
          ? {
              ...circuito,
              ejercicios: circuito.ejercicios.map((ejercicio) =>
                ejercicio.id === exerciseId
                  ? { ...ejercicio, id_ejercicio: newValue ? newValue.value : null, nombre: newValue ? newValue.label : '' }
                  : ejercicio
              ),
            }
          : circuito
      )
    )
  }
  const deleteExercise = (circuitoId, ejercicioId) => {
    setCircuitos(prev => prev.map(circuito => {
      if (circuito.id === circuitoId) {
        return {
          ...circuito,
          ejercicios: circuito.ejercicios.filter(ejercicio => ejercicio.id !== ejercicioId)
        };
      }
      return circuito;
    }));
  };

  return (
    <Grid container spacing={2} key={ejercicio.id} sx={{ mb: 3 }} alignItems="center">
      <Grid item xs={12} sm={3}>
        <Autocomplete
          options={dataEj}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id_ejercicio}
          renderInput={(params) => (
            <TextField {...params} label="Ejercicio" error={ejercicio.ejercicioError} helperText={ejercicio.ejercicioError ? 'Campo requerido' : ''} />
          )}
          value={dataEj.find(e => e.value === ejercicio.id_ejercicio) || null}
          onChange={(event, newValue) => handleExerciseSelect(circuitoId, ejercicio.id, newValue)}
          fullWidth
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
    </Grid>
  );
}

EjercicioEditar.propTypes = {
  ejercicio: PropTypes.object.isRequired,
  ejercicioIndex: PropTypes.number.isRequired,
  circuitoId: PropTypes.string.isRequired,
  setCircuitos: PropTypes.func.isRequired,
  dataEj: PropTypes.array.isRequired,
};

export default EjercicioEditar;

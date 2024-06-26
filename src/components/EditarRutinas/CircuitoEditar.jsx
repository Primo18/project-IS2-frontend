import { Grid, TextField, Button, Card, Box, Typography, Paper, Autocomplete } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import EjercicioEditar from './EjercicioEditar';
import { useEffect } from 'react';

function CircuitoEditar({ circuito, circuitoIndex, setCircuitos, dataEj }) {
  //console.log(circuito);
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
    <Card component={Paper} variant="outlined" sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6">Circuito {circuitoIndex + 1}</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={2}>
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
            value={circuito.observaciones || ''}
            onChange={(e) => handleCircuitoChange(circuito.id, 'observaciones', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
        <Autocomplete
          options={[{ label: 'Completado', value: 1 }, { label: 'No Completado', value: 0 }]}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          value={circuito.estado === 1 ? { label: 'Completado', value: 1 } : { label: 'No Completado', value: 0 }}
          onChange={(event, newValue) => {
            handleCircuitoChange(circuito.id, 'estado', newValue.value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Estado Circuito" fullWidth />
          )}
        />
        </Grid>
        <Grid item xs={12} md={2}>
        <TextField
            label="Descanso"
            value={circuito.descanso}
            onChange={(e) => handleCircuitoChange(circuito.id, 'descanso', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={circuito.descansoError}
            helperText={circuito.descansoError ? 'Campo requerido' : ''}
          />
        </Grid>
      </Grid>
      
      {circuito.ejercicios.map((ejercicio, ejercicioIndex) => (
         <EjercicioEditar
         key={ejercicio.id}
         ejercicio={ejercicio}
         ejercicioIndex={ejercicioIndex}
         circuitoId={String(circuito.id)}
         setCircuitos={setCircuitos}
         dataEj={dataEj}
       />
     ))}
    {/*
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
     */}
   </Card>
   
 );
}

CircuitoEditar.propTypes = {
 circuito: PropTypes.object.isRequired,
 circuitoIndex: PropTypes.number.isRequired,
 setCircuitos: PropTypes.func.isRequired,
 dataEj: PropTypes.array.isRequired
};

export default CircuitoEditar;
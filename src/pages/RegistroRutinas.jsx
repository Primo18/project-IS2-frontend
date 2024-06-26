import { useLoaderData } from 'react-router-dom';
import { TextField, Button, Card, Box, Typography, Grid, Autocomplete, Paper } from '@mui/material';
import Circuito from '../components/RegistroRutinas/Circuito';
import useRutinaForm from '../hooks/useRutinaForm';

function RegistroRutinas() {
  const dataCl = useLoaderData().clientes;
  const dataEj = useLoaderData().ejercicios;
  const {
    clasificacion,
    circuitos,
    clienteError,
    entrenadorError,
    clasificacionError,
    setCliente,
    setClasificacion,
    setCircuitos,
    handleSaveRoutine,
    addCircuito,
  } = useRutinaForm(dataCl, dataEj);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 3 }}>
      <Typography variant="h4" textAlign="center" mb={4}>Registro de Rutinas</Typography>
      <Card variant="outlined" sx={{ p: 2 }} component={Paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={dataCl}
              getOptionKey={(option) => option.value} // Utiliza el ID del cliente como clave
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Usuario" error={clienteError} helperText={clienteError ? 'Campo requerido' : ''} />
              )}
              onChange={(event, newValue) => setCliente(newValue)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Clasificación"
              value={clasificacion}
              onChange={(e) => setClasificacion(e.target.value)}
              fullWidth
              error={clasificacionError}
              helperText={clasificacionError ? 'Campo requerido' : ''}
            />
          </Grid>
        </Grid>
      </Card>

      {circuitos.map((circuito, circuitoIndex) => (
        <Circuito
          key={circuito.id}
          circuito={circuito}
          circuitoIndex={circuitoIndex}
          setCircuitos={setCircuitos}
          dataEj={dataEj}
        />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size='large'
          sx={{ mt: 4, mr: 3, bgcolor: '#EC9C00', '&:hover': { bgcolor: '#C68100' }, color: '#000000' }}
          onClick={handleSaveRoutine}>
          Guardar Rutina
        </Button>
        <Button
          variant="contained"
          color="primary"
          size='large'
          sx={{ mt: 4, ml: 3, bgcolor: '#EC9C00', '&:hover': { bgcolor: '#C68100' }, color: '#000000' }}
          onClick={addCircuito}
        >
          Agregar Circuito
        </Button>
      </Box>
    </Box>
  );
}

export default RegistroRutinas;
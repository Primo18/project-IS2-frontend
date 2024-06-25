import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, Box, Typography, Grid, Autocomplete, Paper } from '@mui/material';
import CircuitoEditar from './CircuitoEditar';
import editRutinaForm from '../../hooks/editRutinaForm';
import {fetchRutinaById } from '../../services/rutinaService';
import { fetchDatosRutina } from '../../services/fetch-datosRutina';
import { v4 as uuidv4 } from 'uuid';

function EditarRutinas({ id_rutina_prop }) {
  const [datosRutina, setDatosRutina] = useState('');
  const [rutina, setRutina] = useState('');

  async function cargarDatos(id_rutina_prop) {
    try {
      const datosRutina = await fetchDatosRutina();
      const rutina = await fetchRutinaById(id_rutina_prop);
      setDatosRutina(datosRutina);
      setRutina(rutina);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  useEffect(() => {
    cargarDatos(id_rutina_prop);
  }, [id_rutina_prop]);

  const {
    cliente,
    entrenador,
    clasificacion,
    circuitos,
    clienteError,
    entrenadorError,
    clasificacionError,
    setCliente,
    setEntrenador,
    setClasificacion,
    setCircuitos,
    handleSaveRoutine,
    addCircuito,
  } = editRutinaForm(datosRutina?.clientes, datosRutina?.ejercicios, rutina);

  useEffect(() => {
    console.log(rutina);
    console.log(datosRutina);
    if (rutina && datosRutina) {
      const clienteSeleccionado = datosRutina.clientes.find((cliente) => cliente.value === rutina.cliente.id_cliente);
      setCliente(clienteSeleccionado || { value: rutina.cliente.id_cliente, label: `${rutina.cliente.nombre_cliente} ${rutina.cliente.apellido}` });
      setEntrenador(`${rutina.entrenador.id_entrenador}`);
      setClasificacion(rutina.clasificacion);

      const circuitosConEjercicios = rutina.circuitos.map((circuito) => {
        const ejercicios = circuito.ejercicios.map((ejercicio) => ({
          id: uuidv4(), // Asegura que cada ejercicio tenga un ID único
          id_ejercicio: ejercicio.id_ejercicio,
          nombre: ejercicio.nombre,
          series: ejercicio.series,
          frecuencia: ejercicio.frecuencia,
          orden: ejercicio.orden,
          descanso: ejercicio.descanso,
        }));
        return { ...circuito, id: uuidv4(), ejercicios }; // Asegura que cada circuito tenga un ID único
      });
      setCircuitos(circuitosConEjercicios);
    }
  }, [rutina, datosRutina, setCliente, setEntrenador, setClasificacion, setCircuitos]);

  if (!datosRutina || !rutina) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 3 }}>
      <Typography variant="h4" textAlign="center" mb={4}>Registro de Rutinas</Typography>
      <Card variant="outlined" sx={{ p: 2 }} component={Paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              options={datosRutina.clientes}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => (
                <TextField {...params} label="Usuario" error={clienteError} helperText={clienteError ? 'Campo requerido' : ''} />
              )}
              value={cliente}
              onChange={(event, newValue) => setCliente(newValue)}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Entrenador"
              value={entrenador}
              onChange={(e) => setEntrenador(e.target.value)}
              fullWidth
              error={entrenadorError}
              helperText={entrenadorError ? 'Campo requerido' : ''}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
        <CircuitoEditar
          key={circuito.id}
          circuito={circuito}
          circuitoIndex={circuitoIndex}
          setCircuitos={setCircuitos}
          dataEj={datosRutina.ejercicios}
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

export default EditarRutinas;
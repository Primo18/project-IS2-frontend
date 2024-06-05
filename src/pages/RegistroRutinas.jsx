import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Typography, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Card, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CircuitForm from './CircuitForm';

function RegistroRutinas() {
  const [cliente, setCliente] = useState('');
  const [entrenador, setEntrenador] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [circuitos, setCircuitos] = useState([{ id: Date.now(), puntuacion: '', repeticiones: '', observaciones: '', ejercicios: [{ id: Date.now(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' }] }]);

  const dataCl = useLoaderData().clientes;
  const dataEj = useLoaderData().ejercicios;

  const addCircuito = () => {
    const newCircuito = {
      id: Date.now(),
      puntuacion: '',
      repeticiones: '',
      observaciones: '',
      ejercicios: [{ id: Date.now(), ejercicio: '', series: '', frecuencia: '', orden: '', descanso: '' }]
    };
    setCircuitos([...circuitos, newCircuito]);
  };

  const handleSaveRoutine = () => {
    const routineData = {
      clasificacion,
      id_cliente: cliente,
      id_usuario: Number(entrenador),
      circuitos: circuitos.map(circuito => ({
        puntuacion: circuito.puntuacion,
        repeticiones: Number(circuito.repeticiones),
        observaciones: circuito.observaciones,
        ejercicios: circuito.ejercicios.map(ejercicio => ({
          id_ejercicio: ejercicio.ejercicio,
          series: Number(ejercicio.series),
          frecuencia: ejercicio.frecuencia,
          orden: Number(ejercicio.orden),
          descanso: ejercicio.descanso,
        })),
      })),
    };

    const jsonData = JSON.stringify(routineData, null, 2);
    console.log(jsonData);

    fetch("https://project-is2-backend-production.up.railway.app/rutina/api", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de Rutinas
      </Typography>
      <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2, width: '100%' } }} noValidate autoComplete="off">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Usuario</InputLabel>
          <Select
            value={cliente}
            onChange={(event) => setCliente(event.target.value)}
          >
            {dataCl.map(cliente => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Entrenador"
          value={entrenador}
          onChange={(event) => setEntrenador(event.target.value)}
        />
        <TextField
          label="Clasificación"
          value={clasificacion}
          onChange={(event) => setClasificacion(event.target.value)}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={addCircuito}>
          Agregar Circuito
        </Button>
      </Box>

      {circuitos.map((circuito, index) => (
        <CircuitForm
          key={circuito.id}
          circuito={circuito}
          index={index}
          circuitos={circuitos}
          setCircuitos={setCircuitos}
          dataEj={dataEj}
        />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSaveRoutine}>
          Guardar Rutina
        </Button>
      </Box>
    </Container>
  );
}

export default RegistroRutinas;

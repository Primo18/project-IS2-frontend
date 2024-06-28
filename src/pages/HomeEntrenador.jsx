import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogContent, DialogTitle, TextField, Button, Checkbox } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { fetchRutinasActivas } from '../services/rutinaService';
import { AuthContext } from '../context/AuthContext';
import { fetchMaquinas } from '../services/fetch-maquinas';
import { terminarRutina, guardarRutina } from '../services/rutinaService';
import { select } from '@material-tailwind/react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const HomeEntrenador = () => {
  const [userName, setUserName] = useState('');
  const [activeClients, setActiveClients] = useState(0);
  const [rutinas, setRutinas] = useState([]);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [observaciones, setObservaciones] = useState({});
  const [checkboxStates, setCheckboxStates] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [machines, setMachines] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setUserName(user.nombre);
    }

    const getRutinasActivas = async () => {
      try {
        const data = await fetchRutinasActivas();
        if (data) {
          const filteredRutinas = data.filter(rutina => rutina.estado === 0);
          setRutinas(filteredRutinas);
          setActiveClients(filteredRutinas.length);
        }
      } catch (error) {
        console.error('Error al obtener rutinas activas:', error);
      }
    };

    getRutinasActivas();
  }, [user]);

  useEffect(() => {
    const obtenerDatosMaquinas = async () => {
      try {
        const dataMaquinas = await fetchMaquinas();
        setMachines(dataMaquinas);
      } catch (error) {
        console.error('Error al obtener datos de máquinas:', error);
      }
    };

    obtenerDatosMaquinas();
  }, []);


  const handleClickOpenVer = (id) => {
    const cliente = rutinas.find((rutina) => rutina.cliente.id_cliente === id);
    setSelectedClient(cliente);
    setOpenClientDialog(true);
  };

  const handleCloseClientDialog = () => {
    setOpenClientDialog(false);
  };

  const handleObservacionChange = (circuitoId, value) => {
    setObservaciones({ ...observaciones, [circuitoId]: value });
  };

  const handleCheckboxChange = (circuitoId) => {
    setCheckboxStates({ ...checkboxStates, [circuitoId]: !checkboxStates[circuitoId] });
  };

  const handleSaveObservaciones = () => {
    const updatedClient = { 
      ...selectedClient, 
      circuitos: selectedClient.circuitos.map(circuito => ({ 
        ...circuito, 
        observaciones: observaciones[circuito.id_circuito] || circuito.observaciones,
        estado: checkboxStates[circuito.id_circuito] ? 1 : 0 
      })) 
    };
    setSelectedClient(updatedClient);
    
    const rutinaData = {
      id_rutina: selectedClient.id_rutina,
      estado: selectedClient.estado,
      circuitos: selectedClient.circuitos.map(circuito => ({
        id_circuito: circuito.id_circuito,
        estado: checkboxStates[circuito.id_circuito] ? 1 : 0,
        observaciones: observaciones[circuito.id_circuito] || 'Sin observaciones'
      }))
    };
  
    const jsonData = JSON.stringify(rutinaData, null, 2);
    console.log(jsonData);
    
    guardarRutina(jsonData);
    
    setOpenClientDialog(false);
  };

  const handleTerminarRutina = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmTerminarRutina = () => {
    const rutinaData = {
      id_rutina: selectedClient.id_rutina,
      estado: 1,
      circuitos: selectedClient.circuitos.map(circuito => ({
        id_circuito: circuito.id_circuito,
        estado: checkboxStates[circuito.id_circuito] ? 1 : 0,
        observaciones: observaciones[circuito.id_circuito] || 'Sin observaciones'
      }))
    };
  
    const jsonData = JSON.stringify(rutinaData, null, 2);
    console.log(jsonData);
    
    terminarRutina(jsonData);

    setOpenConfirmDialog(false);
    setOpenClientDialog(false);
  };

  const handleCancelTerminarRutina = () => {
    setOpenConfirmDialog(false);
  };

  useEffect(() => {
    if (selectedClient && selectedClient.circuitos) {
      const initialObservations = selectedClient.circuitos.reduce((acc, circuito) => {
        acc[circuito.id_circuito] = circuito.observaciones || '';
        return acc;
      }, {});
      setObservaciones(initialObservations);

      const initialCheckboxStates = selectedClient.circuitos.reduce((acc, circuito) => {
        acc[circuito.id_circuito] = circuito.estado === 1;
        return acc;
      }, {});
      setCheckboxStates(initialCheckboxStates);
    }
  }, [selectedClient]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5">¡Bienvenido/a, {userName}!</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ mr: 1 }}>Clientes Activos :</Typography>
            <Typography variant="h5" sx={{ ml: 2 }}>{activeClients}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 2, borderRadius: 2, height: '340px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Clientes Activos</Typography>
            <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: 'green', borderRadius: '50%' }}></Box>
          </Box>
          <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rutinas.map((rutina) => (
                  <TableRow key={rutina.cliente.id_cliente}>
                    <TableCell>{rutina.cliente.id_cliente}</TableCell>
                    <TableCell>{rutina.cliente.nombre}</TableCell>
                    <TableCell>{rutina.cliente.apellido}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpenVer(rutina.cliente.id_cliente)}>
                        <AccountCircleIcon sx={{ color: '#EC9C00' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 2, borderRadius: 2, height: '260px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Máquinas No Funcionales
          </Typography>
          <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Reportado Por</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {machines.map((machine) => (
                  <TableRow key={machine.id_maquina} hover>
                    <TableCell>{machine.id_maquina}</TableCell>
                    <TableCell>{machine.nombre_maquina}</TableCell>
                    <TableCell>{machine.descripcion}</TableCell>
                    <TableCell>{machine.reporte}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog
        open={openClientDialog}
        onClose={handleCloseClientDialog}
        PaperProps={{
          style: {
            backgroundColor: '#222222',
            color: 'white',
            width: '600px',
            height: 'auto',
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display          : 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Detalles del Cliente</Typography>
            <IconButton onClick={handleCloseClientDialog}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedClient && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img src={selectedClient.cliente.foto} alt="Cliente" style={{ marginRight: '16px', borderRadius: '50%', width: '100px', height: '100px' }} />
                <Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Nombre */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Nombre:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.cliente.nombre} {selectedClient.cliente.apellido}</Typography>
                      </Box>
                    </Box>

                    {/* Edad */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                      Fecha de Nac:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.cliente.fecha_nacimiento}</Typography>
                      </Box>
                    </Box>

                    {/* Telefono */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Telefono:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.cliente.telefono}</Typography>
                      </Box>
                    </Box>

                    {/* Suscripcion */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Suscripcion:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.cliente.suscripcion}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {selectedClient.clasificacion && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 1, justifyContent: 'flex-start', width: '90%' }}>
                    <Typography variant="h6">Nombre Rutina: {selectedClient.clasificacion}</Typography>
                    <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: 'green', borderRadius: '50%', mb:'10px' }}></Box>
                  </Box>
                  <Box sx={{ width: '100%', height: 2, backgroundColor: '#EC9C00', my: 2 }} />
                  <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
                  {selectedClient.circuitos.map((circuito) => (
                      <Box key={circuito.id_circuito} sx={{ mt: 2 }}>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                          <Checkbox 
                            sx={{ mr: 1, ml: -1 }} 
                            checked={checkboxStates[circuito.id_circuito] || false} 
                            onChange={() => handleCheckboxChange(circuito.id_circuito)}
                          />
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>Circuito ID: {circuito.id_circuito}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', mt: '10px' }}>
                          <Box sx={{ color: 'black', p: 1, borderRadius: 2, background: '#EC9C00', flex: 1, textAlign: 'center', mr: 1 }}>
                            <Typography>Descansos: {circuito.descanso}</Typography>
                          </Box>
                          <Box sx={{ color: 'black', p: 1, borderRadius: 2, background: '#EC9C00', flex: 1, textAlign: 'center', ml: 1 }}>
                            <Typography>Repeticiones: {circuito.repeticiones}</Typography>
                          </Box>
                        </Box>
                        <TableContainer component={Paper} sx={{ mt: 2, maxHeight: '200px' }}>
                          <Table stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell>Ejercicio</TableCell>
                                <TableCell>Series</TableCell>
                                <TableCell>Frecuencia</TableCell>
                                <TableCell>Orden</TableCell>
                                <TableCell>Descanso</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {circuito.ejercicios.map((ejercicio) => (
                                <TableRow key={`${circuito.id_circuito}-${ejercicio.id_ejercicio}`}>
                                  <TableCell>{ejercicio.nombre}</TableCell>
                                  <TableCell>{ejercicio.series}</TableCell>
                                  <TableCell>{ejercicio.frecuencia}</TableCell>
                                  <TableCell>{ejercicio.orden}</TableCell>
                                  <TableCell>{ejercicio.descanso}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TextField
                          label="Observaciones"
                          variant="outlined"
                          fullWidth
                          multiline
                          maxRows={4}
                          value={observaciones[circuito.id_circuito] || ''}
                          onChange={(e) => handleObservacionChange(circuito.id_circuito, e.target.value)}
                          sx={{ mt: 2, mb: 2 }}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 2, backgroundColor: '#EC9C00', '&:hover': { backgroundColor: '#BF7B00' } }}
                      onClick={handleTerminarRutina}
                    >
                      Terminar Rutina
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 2, backgroundColor: '#EC9C00', '&:hover': { backgroundColor: '#BF7B00' } }}
                      onClick={handleSaveObservaciones}
                    >
                      Guardar Cambios
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para terminar la rutina */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelTerminarRutina}
        PaperProps={{
          style: {
            backgroundColor: '#222222',
            color: 'white',
            width: '400px',
            height: 'auto',
          },
        }}
      >
        <DialogTitle>
          Confirmación
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro que deseas terminar la rutina del cliente?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2, backgroundColor: '#EC9C00', '&:hover': { backgroundColor: '#BF7B00' } }}
              onClick={handleConfirmTerminarRutina}
            >
              Confirmar
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2, backgroundColor: '#ACACAC', '&:hover': { backgroundColor: '#777777' } }}
              onClick={handleCancelTerminarRutina}
            >
              Cancelar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomeEntrenador;
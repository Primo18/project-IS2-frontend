import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogContent, DialogTitle, TextField, Button, Checkbox } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

const HomeEntrenador = () => {
  const [userName, setUserName] = useState('');
  const [activeClients, setActiveClients] = useState(0);
  const [maquinasData, setMaquinasData] = useState([]);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [observaciones, setObservaciones] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Estado para controlar el diálogo de confirmación

  const handleClickOpenVer = (id) => {
    const cliente = simulatedClients.find((client) => client.id === id);
    setSelectedClient(cliente);
    setOpenClientDialog(true);
  };

  const handleCloseClientDialog = () => {
    setOpenClientDialog(false);
  };

  const handleObservacionChange = (circuitoId, value) => {
    setObservaciones({ ...observaciones, [circuitoId]: value });
  };

  const handleSaveObservaciones = () => {
    const updatedClient = { ...selectedClient, rutina: { ...selectedClient.rutina, observaciones } };
    setSelectedClient(updatedClient);
    setOpenClientDialog(false);
  };

  const handleTerminarRutina = () => {
    setOpenConfirmDialog(true); // Abrir el diálogo de confirmación antes de terminar la rutina
  };
  const handleConfirmTerminarRutina = () => {
    // Aquí deberías implementar la lógica para finalizar la rutina
    // Por ejemplo, puedes resetear el estado o hacer cualquier otra acción necesaria
    setOpenConfirmDialog(false); // Cierra el diálogo de confirmación
    setOpenClientDialog(false); // Cierra el diálogo principal
  };

  const handleCancelTerminarRutina = () => {
    setOpenConfirmDialog(false); // Cancelar y cerrar el diálogo de confirmación
  };

  useEffect(() => {
    const simulatedUserName = 'Jane Smith';
    const simulatedActiveClients = 50;

    const simulatedMaquinaData = [
      { id: 1, nombre: 'Cinta de correr A', reporte: 'No enciende', foto: 'https://via.placeholder.com/100', estado: 'No Funcional' },
      { id: 2, nombre: 'Bicicleta estática B', reporte: 'Pantalla rota', foto: 'https://via.placeholder.com/100', estado: 'No Funcional' },
      { id: 3, nombre: 'Máquina de remo C', reporte: 'Ruido extraño', foto: 'https://via.placeholder.com/100', estado: 'No Funcional' },
      { id: 4, nombre: 'Máquina elíptica D', reporte: 'No responde', foto: 'https://via.placeholder.com/100', estado: 'No Funcional' },
      { id: 5, nombre: 'Pesas ajustables E', reporte: 'Cable roto', foto: 'https://via.placeholder.com/100', estado: 'No Funcional' },
      { id: 6, nombre: 'Banco de abdominales F', reporte: 'Error de software', foto: 'https://via.placeholder.com/100', estado: 'No Funcional' }
    ];

    setUserName(simulatedUserName);
    setActiveClients(simulatedActiveClients);
    setMaquinasData(simulatedMaquinaData);
  }, []);

  const simulatedClients = [
    {
      id: 101,
      nombre: 'Cliente 1',
      apellido: 'Apellido 1',
      edad: 25,
      altura: 175,
      peso: 70,
      foto: 'https://via.placeholder.com/100',
      rutina: {
        nombre: 'Fuerza',
        circuitos: [
          {
            id: 1,
            nombre: 'Circuito 1',
            ejercicios: [
              { ejercicio: 'Sentadillas', series: 3, frecuencia: '2min', orden: 1, descanso:'1min'},
              { ejercicio: 'Press de banca', series: 3, frecuencia: '2min', orden: 2, descanso:'1,5min' }
            ],
            descansos: '30s',
            repeticiones: 15,
            observaciones: ''
          },
          {
            id: 2,
            nombre: 'Circuito 2',
            ejercicios: [
              { ejercicio: 'Peso muerto', series: 3, frecuencia: '3min', orden: 1, descanso:'2min' },
              { ejercicio: 'Remo con barra', series: 3, frecuencia: '5min', orden: 2, descanso:'1min' }
            ],
            descansos: '60s',
            repeticiones: 10,
            observaciones: ''
          }
        ]
      }
    },
    { id: 102, nombre: 'Cliente 2', apellido: 'Apellido 2', edad: 30, altura: 180, peso: 75, foto: 'https://via.placeholder.com/100' },
    { id: 103, nombre: 'Cliente 3', apellido: 'Apellido 3', edad: 22, altura: 165, peso: 60, foto: 'https://via.placeholder.com/100' },
    { id: 104, nombre: 'Cliente 4', apellido: 'Apellido 4', edad: 27, altura: 170, peso: 68, foto: 'https://via.placeholder.com/100' },
    { id: 105, nombre: 'Cliente 5', apellido: 'Apellido 5', edad: 35, altura: 160, peso: 65, foto: 'https://via.placeholder.com/100' }
  ];

  useEffect(() => {
    if (selectedClient && selectedClient.rutina) {
      const initialObservations = selectedClient.rutina.circuitos.reduce((acc, circuito) => {
        acc[circuito.id] = circuito.observaciones || '';
        return acc;
      }, {});
      setObservaciones(initialObservations);
    }
  }, [selectedClient]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5">¡Bienvenido, {userName}!</Typography>
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
                {simulatedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.nombre}</TableCell>
                    <TableCell>{client.apellido}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpenVer(client.id)}>
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
                  <TableCell>Reporte</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maquinasData.map((maquina) => (
                  <TableRow key={maquina.id}>
                    <TableCell>{maquina.id}</TableCell>
                    <TableCell>{maquina.nombre}</TableCell>
                    <TableCell>{maquina.reporte}</TableCell>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <img src={selectedClient.foto} alt="Cliente" style={{ marginRight: '16px', borderRadius: '50%', width: '100px', height: '100px' }} />
                <Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Nombre */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Nombre:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.nombre} {selectedClient.apellido}</Typography>
                      </Box>
                    </Box>

                    {/* Edad */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Edad:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.edad}</Typography>
                      </Box>
                    </Box>

                    {/* Altura */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Altura:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.altura} cm</Typography>
                      </Box>
                    </Box>

                    {/* Peso */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <Typography sx={{ color: 'white', p: 0.5, borderRadius: 2, background: '#1C1C1C', minWidth: '140px', textAlign: 'left', mb: 1 }}>
                        Peso:
                      </Typography>
                      <Box sx={{ flex: '1 1 auto', p: 0.5, borderRadius: 2, textAlign: 'left', mb: 1 }}>
                        <Typography>{selectedClient.peso} kg</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {selectedClient.rutina && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 1, justifyContent: 'flex-start', width: '90%' }}>
                    <Typography variant="h6">Nombre Rutina: {selectedClient.rutina.nombre}</Typography>
                    <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: 'green', borderRadius: '50%', mb:'10px' }}></Box>
                  </Box>
                  <Box sx={{ width: '100%', height: 2, backgroundColor: '#EC9C00', my: 2 }} />
                  <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
                    {selectedClient.rutina.circuitos.map((circuito) => (
                      <Box key={circuito.id} sx={{ mt: 2 }}>
                        <Box key={circuito.id} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                          <Checkbox sx={{ mr: 1, ml: -1 }} />
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>{circuito.nombre}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', mt: '10px' }}>
                          <Box sx={{ color: 'black', p: 1, borderRadius: 2, background: '#EC9C00', flex: 1, textAlign: 'center', mr: 1 }}>
                            <Typography>Descansos: {circuito.descansos}</Typography>
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
                              {circuito.ejercicios.map((ejercicio, index) => (
                                <TableRow key={index}>
                                  <TableCell>{ejercicio.ejercicio}</TableCell>
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
                          value={observaciones[circuito.id] || ''}
                          onChange={(e) => handleObservacionChange(circuito.id, e.target.value)}
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

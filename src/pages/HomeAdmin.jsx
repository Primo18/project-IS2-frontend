import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CloseIcon from '@mui/icons-material/Close';

const HomeAdmin = () => {
  const [userName, setUserName] = useState('');
  const [activeClients, setActiveClients] = useState(0);
  const [maquinasData, setMaquinasData] = useState([]);
  const [openTrainerDialog, setOpenTrainerDialog] = useState(false);
  const [openMachineDialog, setOpenMachineDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleClickOpenVer = (id) => {
    const entrenador = simulatedTrainers.find((trainer) => trainer.id === id);
    setSelectedTrainer(entrenador);
    setOpenTrainerDialog(true);
  };

  const handleClickOpenVerMaquina = (id) => {
    const maquina = maquinasData.find((maquina) => maquina.id === id);
    setSelectedMachine(maquina);
    setOpenMachineDialog(true);
  };

  const handleCloseTrainerDialog = () => {
    setOpenTrainerDialog(false);
  };

  const handleCloseMachineDialog = () => {
    setOpenMachineDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmarArreglo = () => {
    // Cambiar el estado de la máquina a funcional y cerrar el diálogo
    const updatedMaquinasData = maquinasData.map((maquina) =>
      maquina.id === selectedMachine.id ? { ...maquina, estado: 'Funcional' } : maquina
    );
    setMaquinasData(updatedMaquinasData);
    handleCloseConfirmDialog();
    handleCloseMachineDialog();
  };

  useEffect(() => {
    const simulatedUserName = 'John Doe';
    const simulatedActiveClients = 150;

    const simulatedMaquinaData = [
      { id: 1, nombre: 'Cinta de correr A', reporte: 'No enciende', reportadoPor: 'John Doe',foto: 'https://via.placeholder.com/100'},
      { id: 2, nombre: 'Bicicleta estática B', reporte: 'Pantalla rota', reportadoPor: 'Jane Smith',foto: 'https://via.placeholder.com/100' },
      { id: 3, nombre: 'Máquina de remo C', reporte: 'Ruido extraño', reportadoPor: 'Sam Green',foto: 'https://via.placeholder.com/100', },
      { id: 4, nombre: 'Máquina elíptica D', reporte: 'No responde', reportadoPor: 'Alice Blue',foto: 'https://via.placeholder.com/100',},
      { id: 5, nombre: 'Pesas ajustables E', reporte: 'Cable roto', reportadoPor: 'Bob Brown',foto: 'https://via.placeholder.com/100', },
      { id: 6, nombre: 'Banco de abdominales F', reporte: 'Error de software', reportadoPor: 'Charlie Black',foto: 'https://via.placeholder.com/100', }
    ];

    setUserName(simulatedUserName);
    setActiveClients(simulatedActiveClients);
    setMaquinasData(simulatedMaquinaData);
  }, []);

  const simulatedTrainers = [
    {
      id: 1,
      nombre: 'John',
      apellido: 'Doe',
      especialidad: 'Agilidad',
      foto: 'https://via.placeholder.com/100',
      clientes: [
        { id: 101, nombre: 'Cliente 1', apellido: 'Apellido 1'},
        { id: 102, nombre: 'Cliente 2', apellido: 'Apellido 2'},
        { id: 103, nombre: 'Cliente 3', apellido: 'Apellido 3'},
        { id: 104, nombre: 'Cliente 4', apellido: 'Apellido 4'},
        { id: 104, nombre: 'Cliente 5', apellido: 'Apellido 5'},
      ]
    },
    {
      id: 2,
      nombre: 'Jane',
      apellido: 'Smith',
      especialidad: 'Fuerza',
      foto: 'https://via.placeholder.com/100',
      clientes: [
        { id: 101, nombre: 'Cliente 1', apellido: 'Apellido 1'},
        { id: 102, nombre: 'Cliente 2', apellido: 'Apellido 2'},
        { id: 103, nombre: 'Cliente 3', apellido: 'Apellido 3'},
        { id: 104, nombre: 'Cliente 4', apellido: 'Apellido 4'},
        { id: 104, nombre: 'Cliente 5', apellido: 'Apellido 5'},
      ]
    }
    ,
    {
      id: 3,
      nombre: 'Juanito',
      apellido: 'Minecraft',
      especialidad: 'Salto',
      foto: 'https://via.placeholder.com/100',
      clientes: [
        { id: 101, nombre: 'Cliente 1', apellido: 'Apellido 1'},
        { id: 102, nombre: 'Cliente 2', apellido: 'Apellido 2'},
        { id: 103, nombre: 'Cliente 3', apellido: 'Apellido 3'},
        { id: 104, nombre: 'Cliente 4', apellido: 'Apellido 4'},
        { id: 104, nombre: 'Cliente 5', apellido: 'Apellido 5'},
      ]
    }
  ];

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
            <Typography variant="h6">Entrenadores Activos</Typography>
            <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: 'green', borderRadius: '50%' }}></Box>
          </Box>
          <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Especialidad</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {simulatedTrainers.map((trainer) => (
                  <TableRow key={trainer.id}>
                    <TableCell>{trainer.id}</TableCell>
                    <TableCell>{trainer.nombre}</TableCell>
                    <TableCell>{trainer.apellido}</TableCell>
                    <TableCell>{trainer.especialidad}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpenVer(trainer.id)}>
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
                  <TableCell>Reportado Por</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maquinasData.map((maquina) => (
                  <TableRow key={maquina.id}>
                    <TableCell>{maquina.id}</TableCell>
                    <TableCell>{maquina.nombre}</TableCell>
                    <TableCell>{maquina.reporte}</TableCell>
                    <TableCell>{maquina.reportadoPor}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpenVerMaquina(maquina.id)}>
                        <FitnessCenterIcon sx={{ color: '#EC9C00' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog
        open={openTrainerDialog}
        onClose={handleCloseTrainerDialog}
        PaperProps={{
          style: {
            backgroundColor: '#222222',
            color: 'white',
            width: '600px',
            height: '550px',
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseTrainerDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '0px', textAlign: 'center' }}>
          {selectedTrainer && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundImage: `url(${selectedTrainer.foto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mb: 2,
                }}
              />
              <Typography variant="h5">{selectedTrainer.nombre} {selectedTrainer.apellido}</Typography>
              <Typography variant="h7">Especialidad: {selectedTrainer.especialidad}</Typography>
              <Box sx={{ width: '80%', height: 2, backgroundColor: '#EC9C00', my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 1, justifyContent: 'flex-start', width: '90%' }}>
                <Typography variant="h6">Clientes Entrenando</Typography>
                <Box sx={{ ml: 1, width: 10, height: 10, bgcolor: 'green', borderRadius: '50%' }}></Box>
              </Box>
              <TableContainer component={Paper} sx={{ backgroundColor: '#222222', maxHeight: '220px', overflow: 'auto', width: '90%' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: 'white' }}>ID</TableCell>
                      <TableCell style={{ color: 'white' }}>Nombre</TableCell>
                      <TableCell style={{ color: 'white' }}>Apellido</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedTrainer.clientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell style={{ color: 'white' }}>{cliente.id}</TableCell>
                        <TableCell style={{ color: 'white' }}>{cliente.nombre}</TableCell>
                        <TableCell style={{ color: 'white' }}>{cliente.apellido}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openMachineDialog}
        onClose={handleCloseMachineDialog}
        PaperProps={{
          style: {
            backgroundColor: '#222222',
            color: 'white',
            width: '600px',
            height: '550px',
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseMachineDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '0px', textAlign: 'center' }}>
          {selectedMachine && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundImage: `url(${selectedMachine.foto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mb: 2,
                }}
              />
              <Typography variant="h5">{selectedMachine.nombre}</Typography>
              <Box sx={{ width: '80%', height: 2, backgroundColor: '#EC9C00', my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 1, justifyContent: 'flex-start', width: '90%' }}>
                <Typography variant="h6">Reporte</Typography>
              </Box>
              <Box sx={{ width: '90%', backgroundColor: '#D9D9D9', color: 'black', p: 1, borderRadius: 2 }}>
                <Typography variant="h6">Descripción del problema</Typography>
              </Box>
              <Box sx={{ width: '90%', color: 'white', p: 2, borderRadius: 2, border: '1px solid #CCCCCC' }}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>{selectedMachine.reporte}</Typography>
              </Box>
              <Box sx={{ width: '90%', backgroundColor: '#D9D9D9', color: 'black', p: 1, borderRadius: 2, mt: 2 }}>
                <Typography variant="h6">Persona/personas que reportaron</Typography>
              </Box>
              <Box sx={{ width: '90%', color: 'white', p: 2, borderRadius: 2, border: '1px solid #CCCCCC' }}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>{selectedMachine.reportadoPor}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: '50%',backgroundColor: '#EC9C00',
                  '&:hover': {
                    backgroundColor: '#BF7B00', }}}
                onClick={handleOpenConfirmDialog}
              >
                Confirmar Arreglo
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        PaperProps={{
          style: {
            backgroundColor: '#222222',
            color: 'white',
            width: '400px',
            height: '200px',
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Typography sx={{mt:'30px'}}variant="h6">¿Confirmar arreglo de la máquina?</Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{
        backgroundColor: '#EC9C00',
        '&:hover': {
          backgroundColor: '#BF7B00',
        }, mb:'10px', mr:'30px'}} onClick={handleConfirmarArreglo} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeAdmin;

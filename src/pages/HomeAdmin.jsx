import React, { useEffect, useState, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../context/AuthContext';
import { fetchRutinasActivas } from '../services/rutinaService';
import { fetchMaquinas } from '../services/fetch-maquinas';
import { UpdateMaquina } from '../services/maquinaService';
import swal from 'sweetalert2';

const HomeAdmin = () => {
  const [machines, setMachines] = useState([]);
  const [userName, setUserName] = useState('');
  const [activeClients, setActiveClients] = useState(0);
  const [openTrainerDialog, setOpenTrainerDialog] = useState(false);
  const [openMachineDialog, setOpenMachineDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { user } = useContext(AuthContext);
  const [rutinas, setRutinas] = useState([]);
  const [uniqueTrainers, setUniqueTrainers] = useState({});
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (user) {
      setUserName(user.nombre);
    }
    const getRutinasActivas = async () => {
      try {
        const data = await fetchRutinasActivas();

        setRutinas(data);
        setActiveClients(data.length);
      }
      catch (error) {
        console.error('Error al obtener rutinas activas:', error);
      }
    };
    const getMachines = async () => {
      try {
        const data = await fetchMaquinas();
        if (data) {
          const filteredMaquinas = data.filter(machine => machine.estado === 'mantencion' || machine.estado === 'reparacion');

          setMachines(filteredMaquinas);
        }

      }
      catch (error) {
        console.error('Error al obtener maquinas:', error);
      }
    };

    getMachines();
    getRutinasActivas();
  }, [user]);


  useEffect(() => {
    // Declaramos una función para obtener entrenadores únicos
    const getUniqueTrainers = () => {
      const uniqueTrainers = {};
      rutinas.forEach((rutina) => {
        const id = rutina.entrenador.id_entrenador;
        if (!uniqueTrainers[id]) {
          uniqueTrainers[id] = rutina.entrenador;
        }
      });
      return uniqueTrainers;
    };

    // Llamamos a la función para obtener los entrenadores únicos
    const trainers = getUniqueTrainers();
    setUniqueTrainers(trainers);
  }, [rutinas]);

  const findClientsByTrainerId = (trainerId) => {
    // Filtrar las rutinas que corresponden al entrenador con trainerId
    const filteredRutinas = rutinas.filter(rutina => rutina.entrenador.id_entrenador === trainerId);

    // Extraer los clientes de las rutinas filtradas
    const clients = filteredRutinas.map(rutina => rutina.cliente);

    return clients;
  };

  const handleClickOpenVer = (id) => {
    const entrenador = rutinas.find((rutina) => rutina.entrenador.id_entrenador === id);
    setSelectedTrainer(entrenador);
    setOpenTrainerDialog(true);

    // Obtener clientes correspondientes al entrenador seleccionado
    const clients = findClientsByTrainerId(id);
    console.log('Clientes del entrenador:', clients);
    // Aquí puedes hacer algo con la lista de clientes, como almacenarla en el estado o mostrarla en algún componente
    setClients(clients);
  };

  const handleClickOpenVerMaquina = (id) => {
    setSelectedMachine(id);
    setOpenMachineDialog(true);
    console.log(id)
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

  const handleConfirmarArreglo = async () => {
    try {
      // Preparar los datos de la máquina actualizados
      const maquinaData = {
        id_maquina: selectedMachine.id_maquina,
        estado: 'disponible',
        descripcion: '',
        reporte: '',
      };

      // Convertir a JSON si es necesario
      const jsonData = JSON.stringify(maquinaData);
      console.log(jsonData);

      // Llamar al servicio para actualizar la máquina
      const updatedMachine = await UpdateMaquina(jsonData);

      // Actualizar el estado local de las máquinas
      setMachines((prevMachines) =>
        prevMachines.map((machine) =>
          machine.id_maquina === selectedMachine.id_maquina
            ? { ...machine, estado: 'disponible', descripcion: maquinaData.descripcion, reporte: maquinaData.reporte }
            : machine
        )
      );

      // Cerrar el diálogo u realizar otras acciones después de actualizar
    } catch (error) {
      console.error('Error al actualizar la máquina:', error);
    }
    handleCloseConfirmDialog();
    handleCloseMachineDialog();
    window.location.reload(true);
  };

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
            <Typography variant="h6" sx={{ mr: 1 }}>Rutinas Activas :</Typography>
            <Typography variant="h5" sx={{ ml: 2 }}>{activeClients}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 2, borderRadius: 2, height: '340px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Entrenadores Activas</Typography>
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
                {Object.values(uniqueTrainers).map((entrenador) => (
                  <TableRow key={entrenador.id_entrenador}>
                    <TableCell>{entrenador.id_entrenador}</TableCell>
                    <TableCell>{entrenador.nombre}</TableCell>
                    <TableCell>{entrenador.apellido}</TableCell>
                    <TableCell>{entrenador.especialidad}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpenVer(entrenador.id_entrenador)}>
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
                  <TableCell>Descripcion</TableCell>
                  <TableCell>Reportado Por</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {machines.map((machine) => (
                  <TableRow key={machine.id_maquina} hover>
                    <TableCell>{machine.id_maquina}</TableCell>
                    <TableCell>{machine.nombre_maquina}</TableCell>
                    <TableCell>{machine.descripcion || ''}</TableCell>
                    <TableCell>{machine.reporte || ''}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpenVerMaquina(machine)}>
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
                  backgroundImage: `url(${selectedTrainer.entrenador.foto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mb: 2,
                }}
              />
              <Typography variant="h5">{selectedTrainer.entrenador.nombre} {selectedTrainer.entrenador.apellido}</Typography>
              <Typography variant="h7">Especialidad: {selectedTrainer.entrenador.especialidad}</Typography>
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
                    {clients.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell style={{ color: 'white' }}>{cliente.id_cliente}</TableCell>
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
                  backgroundColor: '#EC9C00',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mb: 2,
                }}
              />
              <Typography variant="h5">{selectedMachine.nombre_maquina}</Typography>
              <Box sx={{ width: '80%', height: 2, backgroundColor: '#EC9C00', my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 1, justifyContent: 'flex-start', width: '90%' }}>
                <Typography variant="h6">Reporte</Typography>
              </Box>
              <Box sx={{ width: '90%', backgroundColor: '#D9D9D9', color: 'black', p: 1, borderRadius: 2 }}>
                <Typography variant="h6">Descripción del problema</Typography>
              </Box>
              <Box sx={{ width: '90%', color: 'white', p: 2, borderRadius: 2, border: '1px solid #CCCCCC' }}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>{selectedMachine.descripcion}</Typography>
              </Box>
              <Box sx={{ width: '90%', backgroundColor: '#D9D9D9', color: 'black', p: 1, borderRadius: 2, mt: 2 }}>
                <Typography variant="h6">Persona/personas que reportaron</Typography>
              </Box>
              <Box sx={{ width: '90%', color: 'white', p: 2, borderRadius: 2, border: '1px solid #CCCCCC' }}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>{selectedMachine.reporte}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2, width: '50%', backgroundColor: '#EC9C00',
                  '&:hover': {
                    backgroundColor: '#BF7B00',
                  }
                }}
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
          <Typography sx={{ mt: '30px' }} variant="h6">¿Confirmar arreglo de la máquina?</Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{
            backgroundColor: '#EC9C00',
            '&:hover': {
              backgroundColor: '#BF7B00',
            }, mb: '10px', mr: '30px'
          }} onClick={handleConfirmarArreglo} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeAdmin;

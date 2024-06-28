import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, Select, MenuItem, TextField, Typography
} from '@mui/material';
import { UpdateMaquina } from '../services/maquinaService';
import swal from 'sweetalert2';

const estados = ['disponible', 'mantencion', 'reparacion'];

function Maquinas() {
  const dataMaquinas = useLoaderData();
  const [machines, setMachines] = useState(dataMaquinas);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [open, setOpen] = useState(false);
  const [newState, setNewState] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [reporte, setReporter] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = (machine) => {
    setSelectedMachine(machine);
    setNewState(machine.estado === 'disponible' ? '' : 'disponible');
    setDescripcion('');
    setReporter('');
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMachine(null);
    setNewState('');
    setDescripcion('');
    setReporter('');
    setError('');
  };

  const handleChangeState = (event) => {
    const { value } = event.target;
    setNewState(value);
  };

  const handleConfirm = async () => {
    if (selectedMachine?.estado === 'disponible' && !newState) {
      setError('Debe seleccionar un nuevo estado.');
      return;
    }

    if (newState !== 'disponible' && (!descripcion || !reporte)) {
      setError('Debe proporcionar una descripción y un reportero.');
      return;
    }

    if (selectedMachine) {
      try {
        const maquinaData = {
          id_maquina: selectedMachine.id_maquina,
          estado: newState,
          descripcion: newState !== 'disponible' ? descripcion : '',
          reporte: newState !== 'disponible' ? reporte : '',
        };

        const jsonData = JSON.stringify(maquinaData);
        console.log(jsonData);
        const updatedMachine = await UpdateMaquina(jsonData);

        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine.id_maquina === selectedMachine.id_maquina
              ? { ...machine, estado: newState, descripcion: selectedMachine.descripcion, reporte: selectedMachine.reporte}
              : machine
          )
        );

        handleClose();
        window.location.reload(true);
      } catch (error) {
        console.error('Error updating machine:', error);
      }
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, ml: '24px', mt: '24px', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5">Máquinas</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ padding: 2, ml: '-8px' }}>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: '75vh', overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Reportado por</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {machines.map((machine) => (
                  <TableRow key={machine.id_maquina} hover>
                    <TableCell>{machine.id_maquina}</TableCell>
                    <TableCell>{machine.nombre_maquina}</TableCell>
                    <TableCell>{machine.estado}</TableCell>
                    <TableCell>{machine.descripcion || ''}</TableCell>
                    <TableCell>{machine.reporte || ''}</TableCell>
                    <TableCell>
                      <Button sx={{
                        backgroundColor: '#EC9C00',
                        '&:hover': {
                        backgroundColor: '#BF7B00',
                        }}}
                        variant="contained"
                        color="primary"
                        onClick={() => handleButtonClick(machine)}
                      >
                        {machine.estado === 'disponible' ? 'Cambiar Estado' : 'Marcar como Disponible'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {selectedMachine && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Cambiar Estado de {selectedMachine.nombre_maquina}</DialogTitle>
          <DialogContent>
            {selectedMachine.estado === 'disponible' ? (
              <>
                <Select
                  value={newState}
                  onChange={handleChangeState}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Seleccione un estado</em>
                  </MenuItem>
                  {estados.filter((estado) => estado !== 'disponible').map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                  margin="dense"
                  label="Descripción"
                  fullWidth
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Reportado por"
                  fullWidth
                  value={reporte}
                  onChange={(e) => setReporter(e.target.value)}
                />
              </>
            ) : (
              <DialogContentText>
                ¿Estás seguro que deseas cambiar el estado de esta máquina a disponible?
              </DialogContentText>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button sx= {{color:'#EC9C00'}}onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button sx={{
              backgroundColor: '#EC9C00',
              '&:hover': {
                backgroundColor: '#BF7B00',
              }}}
              onClick={handleConfirm}
              color="primary"
              variant="contained"
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Maquinas;

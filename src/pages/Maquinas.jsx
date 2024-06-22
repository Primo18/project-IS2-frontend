import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, Select, MenuItem, Typography
} from '@mui/material';
import { UpdateMaquina } from '../services/maquinaService';

const estados = ['disponible', 'mantencion', 'reparacion'];

function Maquinas() {
  const dataMaquinas = useLoaderData();
  const [machines, setMachines] = useState(dataMaquinas);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (machine) => {
    setSelectedMachine(machine);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMachine(null);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedMachine((prev) => ({ ...prev, estado: value }));
  };

  const handleConfirm = async () => {
    if (selectedMachine) {
      try {
        const maquinaData = {
          id_maquina: selectedMachine.id_maquina,
          estado: selectedMachine.estado,
        }

        const jsonData = JSON.stringify(maquinaData)
        console.log(jsonData);
        const updatedMachine = await UpdateMaquina(jsonData);
        
        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine.id_maquina === selectedMachine.id_maquina
              ? { ...machine, estado: selectedMachine.estado }
              : machine
          )
        );

        handleClose();
      } catch (error) {
        console.error('Error updating machine:', error);
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" textAlign="center" mb={4}>Maquinas</Typography>
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {machines.map((machine) => (
                  <TableRow
                    key={machine.id_maquina}
                    hover
                    onClick={() => handleRowClick(machine)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{machine.id_maquina}</TableCell>
                    <TableCell>{machine.nombre_maquina}</TableCell>
                    <TableCell>{machine.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Cambiar Estado de {selectedMachine?.nombre_maquina}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas cambiar el estado de esta máquina?
          </DialogContentText>
          <Select
            value={selectedMachine?.estado || ''}
            label="Estado"
            onChange={handleChange}
            fullWidth
          >
            {estados.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Maquinas;

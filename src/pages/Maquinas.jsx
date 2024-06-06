import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const initialMachines = [
  { id: 1, name: 'Cinta de Correr', status: 'Funcional' },
  { id: 2, name: 'Pesas Rusas', status: 'No funcional' },
  { id: 3, name: 'Máquina de Remo', status: 'Funcional' },
  { id: 4, name: 'Cajas de Salto ', status: 'No funcional' },
];

function Maquinas() {
  const [machines, setMachines] = useState(initialMachines);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (machine) => {
    setSelectedMachine(machine);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setMachines(prevMachines =>
      prevMachines.map(machine =>
        machine.id === selectedMachine.id
          ? { ...machine, status: machine.status === 'Funcional' ? 'No funcional' : 'Funcional' }
          : machine
      )
    );
    handleClose();
  };

  return (
    <div>
      <Grid container spacing={2} sx={{padding:3}}>
        <Grid item xs={12} >
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
                {machines.map(machine => (
                  <TableRow 
                    key={machine.id}
                    hover
                    onClick={() => handleRowClick(machine)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{machine.id}</TableCell>
                    <TableCell>{machine.name}</TableCell>
                    <TableCell>{machine.status}</TableCell>
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
        <DialogTitle>Cambiar Estado de {selectedMachine?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas cambiar el estado de esta máquina?
          </DialogContentText>
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

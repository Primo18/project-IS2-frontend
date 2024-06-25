import React, { useState } from 'react';
import { Card, CardContent, Paper, Typography, Grid, Box, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Divider, List, ListItem, ListItemText, TableSortLabel, TextField, Toolbar } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EditIcon from '@mui/icons-material/Edit';
import EditarRutinas from '../components/EditarRutinas/EditarRutinas';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function Cliente() {
  const { cliente, rutinas } = useLoaderData();
  const [expanded, setExpanded] = useState({});
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fecha_rutina');
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditar, setOpenEditar] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);

  const handleClickOpenEditar = (id) => {
    setIdToEdit(id);
    setOpenEditar(true);
    console.log(`Editar rutina con id: ${id}`);
  };

  const handleCloseEditar = () => {
    setOpenEditar(false);
    setDataChanged(true);
  };

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRutinas = rutinas.filter((rutina) =>
    rutina.fecha_rutina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rutina.clasificacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRutinas = filteredRutinas.sort((a, b) => {
    if (orderBy === 'fecha_rutina') {
      return order === 'asc' ? new Date(a.fecha_rutina) - new Date(b.fecha_rutina) : new Date(b.fecha_rutina) - new Date(a.fecha_rutina);
    } else {
      return order === 'asc' ? a.clasificacion.localeCompare(b.clasificacion) : b.clasificacion.localeCompare(a.clasificacion);
    }
  });

  return (
    <Grid container spacing={3} padding={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src={cliente.fotoPerfil} // URL de la foto de perfil del cliente
              alt={`${cliente.nombre} ${cliente.apellido}`}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h4" gutterBottom align="center" sx={{ color: "#EC9C00" }}>
              {cliente.nombre} {cliente.apellido}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 2, backgroundColor: '#EC9C00' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Email:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{cliente.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Fecha de Nacimiento:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{cliente.fecha_nacimiento}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Teléfono:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{cliente.telefono}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Suscripción:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{cliente.suscripcion}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          <Toolbar>
            <TextField
              variant="outlined"
              label="Buscar"
              onChange={handleSearch}
              value={searchTerm}
              size="small"
              sx={{ marginBottom: 0, width: '300px' }}
            />
          </Toolbar>
          <Table aria-label="rutinas table">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'fecha_rutina' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'fecha_rutina'}
                    direction={orderBy === 'fecha_rutina' ? order : 'asc'}
                    onClick={() => handleRequestSort('fecha_rutina')}
                  >
                    Fecha
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'clasificacion' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'clasificacion'}
                    direction={orderBy === 'clasificacion' ? order : 'asc'}
                    onClick={() => handleRequestSort('clasificacion')}
                  >
                    Nombre de la Rutina
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Acciones</TableCell>
                <TableCell align="right">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRutinas.map((rutina) => (
                <React.Fragment key={rutina.id_rutina}>
                  <TableRow>
                    <TableCell>{rutina.fecha_rutina}</TableCell>
                    <TableCell>{rutina.clasificacion}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleExpandClick(rutina.id_rutina)}>
                        {expanded[rutina.id_rutina] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleClickOpenEditar(rutina.id_rutina)}>
                        <EditIcon sx={{ color: '#EC9C00' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} style={{ padding: 0, borderBottom: 'none' }}>
                      <Collapse in={expanded[rutina.id_rutina]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          {rutina.circuitos.map((circuito) => (
                            <Box key={circuito.id_circuito} sx={{ marginBottom: 2 }}>
                              <Typography variant="h6" sx={{ color: "#EC9C00" }}>
                                Circuito
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                Repeticiones: {circuito.repeticiones} | Descanso: {circuito.descanso}
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                Observaciones: {circuito.observaciones}
                              </Typography>
                              <List>
                                {circuito.ejercicios.map((ejercicio) => (
                                  <React.Fragment key={ejercicio.id_ejercicio}>
                                    <ListItem>
                                      <Card elevation={1} sx={{ display: 'flex', width: '100%' }}>
                                        {ejercicio.imagen ? (
                                          <CardMedia
                                            component="img"
                                            sx={{ width: 150 }}
                                            image={ejercicio.imagen}
                                            alt={ejercicio.nombre}
                                          />
                                        ) : (
                                          <Box sx={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC9C00' }}>
                                                                                        <FitnessCenterIcon sx={{ fontSize: 60, color: '#222222', backgroundColor: '#EC9C00' }} />
                                          </Box>
                                        )}
                                        <CardContent>
                                          <ListItemText
                                            primary={ejercicio.nombre}
                                            secondary={ejercicio.descripcion}
                                          />
                                          <Typography variant="body2" color="textSecondary">
                                            Series: {ejercicio.series} | Frecuencia: {ejercicio.frecuencia} | Orden: {ejercicio.orden} | Descanso: {ejercicio.descanso}
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    </ListItem>
                                    <Divider />
                                  </React.Fragment>
                                ))}
                              </List>
                              <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2, color: "#EC9C00" }}>
                                Puntuación: {circuito.puntuacion}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Dialog
        open={openEditar}
        onClose={handleCloseEditar}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(0.13, 0.13, 0.13)', // Establece el color de fondo a #222222
            width: '80vw', // Ajusta el ancho del diálogo al 80% del viewport width
            maxWidth: '80vw', // Asegura que el ancho máximo también sea del 80% del viewport width
            height: '80vh', // Ajusta la altura del diálogo al 80% del viewport height
            maxHeight: '80vh' // Asegura que la altura máxima también sea del 80% del viewport height
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)', // Efecto de desenfoque
          }
        }}
      >
        <DialogContent style={{ paddingTop: '0px' }}>
          <EditarRutinas id_rutina_prop={idToEdit} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Cliente;
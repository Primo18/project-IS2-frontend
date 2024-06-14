import React, { useState } from 'react';
import { Paper, Typography, Grid, List, ListItem, ListItemText, Divider, Box, Collapse, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Cliente = () => {
  const { cliente, rutinas } = useLoaderData();
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Grid container spacing={3} padding={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: "#EC9C00" }}>
            {cliente.nombre} {cliente.apellido}
          </Typography>
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
      {rutinas.map((rutina) => (
        <Grid item xs={12} md={8} key={rutina.id_rutina}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ color: "#EC9C00" }}>
              Rutina: {rutina.clasificacion}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha: {rutina.fecha_rutina}
            </Typography>
            {rutina.circuitos.map((circuito) => (
              <Card elevation={2} sx={{ margin: '16px 0' }} key={circuito.id_circuito}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ color: "#EC9C00" }}>
                      Circuito
                    </Typography>
                    <IconButton onClick={() => handleExpandClick(circuito.id_circuito)}>
                      {expanded[circuito.id_circuito] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="body1" color="textSecondary">
                    Repeticiones: {circuito.repeticiones} | Descanso: {circuito.descanso}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Observaciones: {circuito.observaciones}
                  </Typography>
                  <Collapse in={expanded[circuito.id_circuito]} timeout="auto" unmountOnExit>
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
                  </Collapse>
                  <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2, color: "#EC9C00" }}>
                    Puntuación: {circuito.puntuacion}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cliente;
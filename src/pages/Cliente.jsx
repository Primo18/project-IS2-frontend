import React from 'react';
import { Paper, Typography, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const Cliente = () => {
  const { cliente, rutinas } = useLoaderData();

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" gutterBottom>
            Cliente: {cliente.nombre} {cliente.apellido}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {cliente.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Fecha de Nacimiento: {cliente.fecha_nacimiento}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Teléfono: {cliente.telefono}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Suscripción: {cliente.suscripcion}
          </Typography>
        </Paper>
      </Grid>
      {rutinas.map((rutina) => (
        <Grid item xs={12} key={rutina.id_rutina}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              Rutina: {rutina.clasificacion}
            </Typography>
            {rutina.circuitos.map((circuito) => (
              <Paper elevation={2} style={{ margin: '16px 0', padding: '16px' }} key={circuito.id_circuito}>
                <Typography variant="h6">
                  Circuito: {circuito.repeticiones} repeticiones
                </Typography>
                <List>
                  {circuito.ejercicios.map((ejercicio) => (
                    <React.Fragment key={ejercicio.id_ejercicio}>
                      <ListItem>
                        <ListItemText
                          primary={ejercicio.nombre}
                          secondary={ejercicio.descripcion}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cliente;

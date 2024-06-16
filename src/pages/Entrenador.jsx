import { Paper, Typography, Grid, Divider, Box } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const Entrenador = () => {
  const { usuario } = useLoaderData();

  return (
    <Grid container spacing={3} padding={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: "#EC9C00" }}>
            {usuario.nombre} {usuario.apellido}
          </Typography>
          <Typography variant="h6" gutterBottom align="center" sx={{ color: "#EC9C00" }}>
            Especialidad: {usuario.especialidad}
          </Typography>
          <Divider sx={{ marginY: 2, backgroundColor: '#EC9C00' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Email:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{usuario.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Fecha de Nacimiento:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{usuario.fecha_nacimiento}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600 }}>
              <Typography variant="body1" sx={{ flex: 1 }}><strong>Teléfono:</strong></Typography>
              <Typography variant="body1" sx={{ flex: 2 }}>{usuario.telefono}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Entrenador;
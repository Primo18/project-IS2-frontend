import { Paper, Typography, Grid, Divider, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { useLoaderData } from 'react-router-dom';
import ana from '../assets/ana.webp';
import juan from '../assets/juan.jpg';

const ProfileImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
}));

const Entrenador = () => {
  const { usuario } = useLoaderData();

  const profileImage = usuario.role === 'administrador' ? juan : ana;

  return (
    <Grid container spacing={3} padding={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
            <Avatar sx={{ width: 100, height: 100 }}>
              <ProfileImage src={profileImage} alt="Profile" />
            </Avatar>
          </Box>
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

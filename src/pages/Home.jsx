import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const data = [
  { id: 1, nombre: 'John Doe', email: 'john.doe@example.com', suscripción: 'Mensual' },
  { id: 2, nombre: 'Jane Smith', email: 'jane.smith@example.com', suscripción: 'Anual' },
  { id: 3, nombre: 'Sam Green', email: 'sam.green@example.com', suscripción: 'Trimestre' },
];

const data2 = [
  { id: 1, nombre: 'Alonso Miau', email: 'alonso.miau@example.com', horario: 'Mañana' },
  { id: 2, nombre: 'Juan Caballero', email: 'juan.caballero@example.com', horario: 'Tarde' },
  { id: 3, nombre: 'Saimon Petricov', email: 'saimon.petricov@example.com', horario: 'Tarde' },
];

const HomeAdmin = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Admin
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Clientes</Typography>
            <Typography variant="h4">150</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Máquinas Operativas</Typography>
            <Typography variant="h4">45/50</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Entrenadores</Typography>
            <Typography variant="h4">12</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Usuarios Recientes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Suscripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nombre}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.suscripción}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Entrenadores Recientes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Horario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nombre}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.horario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

  );
};

export default HomeAdmin;

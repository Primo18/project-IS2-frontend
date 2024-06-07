import React from 'react';
import { AppBar, Toolbar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Logo from '../assets/logo.png';
import Banner from '../assets/banner.webp';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Presentacion = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '16px', width: '160px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mr: 2 }}>
              Iniciar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '64px' }}>
        <Container maxWidth="md">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                  margin: '20px auto',
                  width: '100%',
                }}
              >
                <img
                  src={Banner}
                  alt="Presentación"
                  style={{ width: '100%', borderRadius: '16px', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" paragraph>
                  Inicia sesión para descubrir una nueva experiencia
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Presentacion;

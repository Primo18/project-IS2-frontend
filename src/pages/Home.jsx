import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import catImage from '../assets/gato.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Item>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img src={catImage} alt="Descripción de la imagen" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <h2 className='TituloHome'>Gimnasio Gato Mamadísimo</h2>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Link to="/dashboard" style={{ textDecoration: 'none', marginRight: 10 }}>
                <Button variant="contained" color="secondary">
                  Dashboard
                </Button>
              </Link>
              <Link to="/registro-rutinas" style={{ textDecoration: 'none', marginRight: 10 }}>
                <Button variant="contained" color="secondary">
                  Registro de Rutinas
                </Button>
              </Link>
              <Link to="/cliente/41" style={{ textDecoration: 'none', marginRight: 10 }}>
                <Button variant="contained" color="secondary">
                  Página del Cliente
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', marginRight: 10 }}>
                <Button variant="contained" color="secondary">
                  Login
                </Button>
              </Link>
              <a href="https://project-is2-backend-production.up.railway.app/evaluacion/createEvaluacion" style={{ textDecoration: 'none', marginRight: 10 }}>
                <Button variant="contained" color="secondary">
                  Crear Evaluación
                </Button>
              </a>
              <a href="https://project-is2-backend-production.up.railway.app/rutina/createRutina" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary">
                  Crear Rutina
                </Button>
              </a>
            </Item>
          </Grid>


          <Grid item xs={12}>
            <Item>
              <h3 className='DescripcionHome'>Presentación del Home de la solución web presentada, aquí el administrador
                en un futuro podrá conocer diversos ámbitos importantes del gimnasio.
              </h3>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div className="h-screen flex justify-center items-center">
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Bienvenido Señor Admin"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                En este home puede visualizar datos relevantes del gimnasio.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Home;

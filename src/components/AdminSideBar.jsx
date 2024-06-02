import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MaquinaIcon from '@mui/icons-material/FitnessCenter';
import RutinaIcon from '@mui/icons-material/Route';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import bannerImage from '../assets/banner.png';

const drawerWidth = 200;

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#515151',
    borderRadius: '10px',
    margin: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: drawerWidth,
  },
}));

const LogoCircle = styled('div')(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '2px auto',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const BottomButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: '#FFA800',
  borderRadius: '10px',
  margin: '10px 14px',
  width: 'auto',
  height: '40px',
  '& .MuiListItemText-root': {
    textAlign: 'center',
  },
}));

const BackgroundImage = styled('div')({
  backgroundImage: `url('url_de_tu_imagen')`, // Reemplaza 'url_de_tu_imagen' con la URL de tu imagen
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100%',
  width: '100%',
});

function AdminSideBar
(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <LogoCircle sx={{ mt: '-5px', mb: '5px' }}>
        <Typography variant="h6">Logo</Typography>
      </LogoCircle>
      <Typography variant="body1" align="center" gutterBottom>
        Nombre Apellido
      </Typography>

      <List>
        {[
          { text: 'HOME', icon: <HomeIcon />, link: '/HomeAdmin' },
          { text: 'CLIENTES', icon: <PersonIcon />, link: '/ClientesAdmin' },
          { text: 'COACHES', icon: <PersonIcon />, link: '/EntrenadoresAdmin' },
          { text: 'MÁQUINAS', icon: <MaquinaIcon />, link: '/MaquinasAdmin' },
          { text: 'RUTINAS', icon: <RutinaIcon />, link: '/RutinasAdmin' },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <BottomButton component={Link} to={item.link}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'black' }} />
            </BottomButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ height: '100px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            flexGrow: 1, // Para que el Drawer ocupe todo el espacio vertical
            overflowY: 'auto', // Añadir scroll si es necesario
          }}
          aria-label="mailbox folders"
        >
          <CustomDrawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                mt: '110px', // Margen superior Drawer en móviles
              },
            }}
          >
            {drawer}
          </CustomDrawer>
          <CustomDrawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                marginTop: '110px', // Ajuste del margen superior para la Toolbar en escritorio
              },
            }}
            open
          >
            {drawer}
          </CustomDrawer>
        </Box>
      </Box>
    </Box>
  );
}

AdminSideBar
.propTypes = {
  window: PropTypes.func,
};

export default AdminSideBar
;

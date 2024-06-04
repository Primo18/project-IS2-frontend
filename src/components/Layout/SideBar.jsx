import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import bannerImage from '../../assets/banner.png';
import profileImage from '../../assets/Profile.png';
import HomeIcon from '@mui/icons-material/Home';
import MaquinaIcon from '@mui/icons-material/FitnessCenter';
import RutinaIcon from '@mui/icons-material/Route';
import PersonIcon from '@mui/icons-material/Person';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const LogoCircle = styled('div')(({ theme }) => ({
  width: 105,
  height: 105,
  borderRadius: '50%',
  backgroundColor: '#EC9C00',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px auto',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: '50%',
  objectFit: 'cover',
}));

const TextContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '20px',
}));

const StyledProSidebar = styled(ProSidebar)({
  '& .pro-sidebar-inner': {
    backgroundColor: '#2D2D2D', // Cambia el color de fondo de la barra lateral
  },
  '& .pro-menu-item:hover .pro-icon-wrapper, & .pro-menu-item.active .pro-icon-wrapper': {
    color: '#EC9C00', // Cambia el color del icono al hacer hover y cuando está activo
  },
  '& .pro-menu-item:hover a, & .pro-menu-item.active a': {
    color: '#EC9C00', // Cambia el color del texto del enlace al hacer hover y cuando está activo
  },
  '& .no-hover': {
    '&:hover': {
      backgroundColor: 'transparent', // Evitar que se coloree el fondo de la imagen y el texto
    },
  },
  '& a': {
    textDecoration: 'none', // Asegurar que los enlaces no tengan subrayado
    color: '#FFFFFF', // Color por defecto del texto del enlace
  },
});

function SideBar(props) {
  const { window } = props;
  const [collapsed, setCollapsed] = React.useState(true);

  const location = useLocation();

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

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
            onClick={handleToggleSidebar}
            sx={{ mr: 2 }}
          >
            <Avatar sx={{ bgcolor: '#EC9C00' }}>
              <MenuIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '100px' }}>
        <StyledProSidebar collapsed={collapsed} width="250px" image="src/assets/gym_snap.jpeg"  >
          <Menu iconShape="circle">
            {!collapsed && (
              <MenuItem className="no-hover">
                <LogoCircle>
                  <ProfileImage src={profileImage} alt="Profile" />
                </LogoCircle>
              </MenuItem>
            )}
            {!collapsed && (
              <MenuItem className="no-hover">
                <TextContainer>
                  <Typography variant="h4">Juanito Pérez</Typography>
                  <Typography variant="subtitle1">Administrador</Typography>
                </TextContainer>
              </MenuItem>
            )}
            <MenuItem icon={<HomeIcon />} active={location.pathname === '/Home'}>
              <Link to="/Home">Home</Link>
            </MenuItem>
            <MenuItem icon={<PersonIcon />} active={location.pathname === '/Clientes'}>
              <Link to="/Clientes">Clientes</Link>
            </MenuItem>
            <MenuItem icon={<MaquinaIcon />} active={location.pathname === '/Maquinas'}>
              <Link to="/Maquinas">Máquinas</Link>
            </MenuItem>
            <MenuItem icon={<RutinaIcon />} active={location.pathname === '/Rutinas'}>
              <Link to="/Rutinas">Rutinas</Link>
            </MenuItem>
          </Menu>
        </StyledProSidebar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Aquí iría el contenido principal del dashboard */}
        </Box>
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;

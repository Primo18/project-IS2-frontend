import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import profileImage from '../../assets/Profile.png';
import HomeIcon from '@mui/icons-material/Home';
import MaquinaIcon from '@mui/icons-material/FitnessCenter';
import RutinaIcon from '@mui/icons-material/Route';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../context/AuthContext';
import gymSnap from '../../assets/gym_snap.jpeg';

const LogoCircle = styled('div')({
  width: 105,
  height: 105,
  borderRadius: '50%',
  backgroundColor: '#EC9C00',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px auto',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

const ProfileImage = styled('img')({
  width: 100,
  height: 100,
  borderRadius: '50%',
  objectFit: 'cover',
});

const TextContainer = styled('div')({
  textAlign: 'center',
  marginBottom: '20px',
});

const StyledProSidebar = styled(ProSidebar)({
  '& .pro-sidebar-inner': {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
  '& .pro-menu-item:hover .pro-icon-wrapper, & .pro-menu-item.active .pro-icon-wrapper': {
    color: '#EC9C00',
  },
  '& .pro-menu-item:hover a, & .pro-menu-item.active a': {
    color: '#EC9C00',
  },
  '& .no-hover': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '& a': {
    textDecoration: 'none',
    color: '#FFFFFF',
  },
});

function SideBar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box>
      <CssBaseline />
      <Box sx={{ height: "100vh", position: 'sticky', top: 0 }}>
        <StyledProSidebar
          collapsed={collapsed}
          width="250px"
          image={gymSnap} >
          <Menu iconShape="circle">
            <MenuItem icon={<MenuIcon />} onClick={handleToggleSidebar}></MenuItem>
            {!collapsed && (
              <>
                <MenuItem className="no-hover">
                  <Link to="/profile">
                    <LogoCircle>
                      <ProfileImage src={profileImage} alt="Profile" />
                    </LogoCircle>
                  </Link>
                </MenuItem>
                <MenuItem className="no-hover">
                  <TextContainer>
                    <Typography variant="h4">Juanito</Typography>
                    <Typography variant="subtitle1">Administrador</Typography>
                  </TextContainer>
                </MenuItem>
              </>
            )}
            <MenuItem icon={<HomeIcon />} active={location.pathname === '/home'}>
              <Link to="/home">Home</Link>
            </MenuItem>
            <MenuItem icon={<PersonIcon />} active={location.pathname === '/clientes'}>
              <Link to="/clientes">Clientes</Link>
            </MenuItem>
            <MenuItem icon={<PersonIcon />} active={location.pathname === '/entrenadores'}>
              <Link to="/entrenadores">Entrenadores</Link>
            </MenuItem>
            <MenuItem icon={<MaquinaIcon />} active={location.pathname === '/maquinas'}>
              <Link to="/maquinas">Máquinas</Link>
            </MenuItem>
            <MenuItem icon={<RutinaIcon />} active={location.pathname === '/rutinas'}>
              <Link to="/rutinas">Rutinas</Link>
            </MenuItem>
            <MenuItem icon={<ExitToAppIcon />} onClick={logout}>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </StyledProSidebar>
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;

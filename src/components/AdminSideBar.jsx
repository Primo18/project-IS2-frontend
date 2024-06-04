import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
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
import CoachIcon from '@mui/icons-material/Sports';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import bannerImage from '../assets/banner.png';
import profileImage from '../assets/ProfileAdmin.png';
import Avatar from '@mui/material/Avatar';

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
  width: 90,
  height: 90,
  borderRadius: '50%',
  backgroundColor: '#EC9C00',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '2px auto',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const ProfileImage = styled('img')(({ theme }) => ({
  width: 85,
  height: 85,
  borderRadius: '50%',
  objectFit: 'cover',
}));

const NombreButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: '#FFA102',
  borderRadius: '20px',
  margin: '10px 14px',
  width: 'auto',
  height: '50px',
}));

const NombreListItemText = styled(ListItemText)({
  textAlign: 'center',
  fontFamily: 'Titillium Web',
});

const BottomButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: '#FFA800',
  borderRadius: '10px',
  margin: '10px 14px',
  width: 'auto',
  height: '40px',
  '& .MuiListItemText-root': {
    textAlign: 'center',
  },
  '&.selected': {
    backgroundColor: '#BA7B00', // Color diferente para el botón seleccionado
  },
}));

function SideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const location = useLocation();

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
        <ProfileImage src={profileImage} alt="Profile" />
      </LogoCircle>
      <NombreButton component={Link} to="/profile" onClick={handleDrawerClose}>
        <NombreListItemText disableTypography primary=
          {<Typography variant="subtitle2" style={{ color: '#000000' }}>Juanito Admin</Typography>}
        />
      </NombreButton>

  
      <List>
      {[
        { text: 'HOME', icon: <HomeIcon sx={{ color: "#000000" }} />, link: '/HomeAdmin' },
        { text: 'CLIENTES', icon: <PersonIcon sx={{ color: "#000000" }} />, link: '/ClientesAdmin' },
        { text: 'COACHES', icon: <CoachIcon sx={{ color: "#000000" }} />, link: '/EntrenadoresAdmin' },
        { text: 'MÁQUINAS', icon: <MaquinaIcon sx={{ color: "#000000" }} />, link: '/MaquinasAdmin' },
        { text: 'RUTINAS', icon: <RutinaIcon sx={{ color: "#000000" }} />, link: '/RutinasAdmin' },
      ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <BottomButton
              component={Link}
              to={item.link}
              className={location.pathname === item.link ? 'selected' : ''}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'black',}} />
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
            <Avatar sx={{ bgcolor: '#EC9C00' }} >
              <MenuIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            flexGrow: 1,
            overflowY: 'auto',
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
                mt: '110px',
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
                marginTop: '110px',
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

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;



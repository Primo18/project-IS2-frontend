import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Baloo Tammudu 2', // Fuente principal
      'Inter Tight', // Segunda fuente
      'Titillium Web', // Tercera fuente
      'Arial', // Fallback genérico
      'sans-serif', // Fallback genérico
    ].join(','),
    subtitle2: {
      fontWeight: 600,
      fontSize: 17
    },
    body1: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 400,
    }
  },
});

const drawerWidth = 240;

const sideBarMap = {
  '/Home': <SideBar />,
  '/Clientes': <SideBar />,
  '/Maquinas': <SideBar />,
  '/Rutinas': <SideBar />,
  // Se pueden añadir aquí más paginas si es necesario, aunque si es un subpath no se requiere.
  // Tambien sirve para añadir más SideBars
};

export const Layout = () => {
  const location = useLocation();

  // Determina SideBar como el predeterminado
  const getSideBar = () => {
    for (const path in sideBarMap) {
      if (location.pathname.startsWith(path)) {
        return sideBarMap[path];
      }
    }
    return <SideBar />; 
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {getSideBar()}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

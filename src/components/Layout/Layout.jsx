// components/Layout/Layout.jsx
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
      'Baloo Tammudu 2',
      'Inter Tight',
      'Titillium Web',
      'Arial',
      'sans-serif',
    ].join(','),
    subtitle2: {
      fontWeight: 600,
      fontSize: 17,
    },
    body1: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 400,
    },
  },
});

const drawerWidth = 240;

const Layout = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
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

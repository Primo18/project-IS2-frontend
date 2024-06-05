import { LoginForm } from '../components/Login/LoginForm';
import { Box, CssBaseline, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const BackgroundBox = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    padding: '124px 24px',
    // background black
    backgroundColor: '#000000',
});

const StyledPaper = styled(Paper)({
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(60, 60, 60, 0.9)', // Fondo semi-transparente para el formulario
    color: '#FFFFFF',
});

const LoginPage = () => {
    return (
        <BackgroundBox>
            <CssBaseline />
            <StyledPaper>
                <Typography variant="h4" component="h1" align="center" style={{ color: '#FFA102' }}>
                    Login
                </Typography>
                <Typography variant="body1" align="center" style={{ color: '#DDDDDD' }}>
                    Bienvenido a la aplicación. Por favor, inicia sesión.
                </Typography>
                <Box mt={2}>
                    <LoginForm />
                </Box>
            </StyledPaper>
        </BackgroundBox>
    );
};

export default LoginPage;

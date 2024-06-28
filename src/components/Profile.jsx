import { useContext } from 'react';
import { Paper, Typography, Grid, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { AuthContext } from '../context/AuthContext';
import juan from '../assets/juan.jpg';
import ana from '../assets/ana.webp';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: 'black',
    color: '#fff',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(50),
    height: theme.spacing(50),
    margin: 'auto',
    backgroundColor: '#555',
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(3),

}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    backgroundColor: '#ff9800',
}));

const InfoTypography = styled(Typography)(({ theme }) => ({
    color: '#ff9800',
    fontWeight: 'bold',
}));

const ProfileImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
}));

const Profile = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Typography>Cargando...</Typography>;
    }

    if (!user) {
        return <Typography>No hay información del usuario</Typography>;
    }

    const profileImage = user.role === 'administrador' ? juan : ana;

    return (
        <Grid container justifyContent="center" padding={3}>
            <Grid item xs={12} md={6}>
                <StyledPaper elevation={3}>
                    <StyledAvatar>
                        <ProfileImage src={profileImage} alt="Profile" />
                    </StyledAvatar>
                    <HeaderTypography variant="h4">
                        {user.nombre} {user.apellido}
                    </HeaderTypography>
                    <HeaderTypography variant="h4">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </HeaderTypography>
                    <StyledDivider />
                    <Typography variant="body1" gutterBottom>
                        <InfoTypography component="span">Email:</InfoTypography> {user.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <InfoTypography component="span">Fecha de Nacimiento:</InfoTypography> {user.fecha_nacimiento}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <InfoTypography component="span">Teléfono:</InfoTypography> {user.telefono}
                    </Typography>
                </StyledPaper>
            </Grid>
        </Grid>
    );
};

export default Profile;

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import RegistroEntrenadores from '../components/Entrenador/RegistroEntrenadores';
import EditarEntrenadores from '../components/Entrenador/EditarEntrenadores';
import { TableContainer, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const VISIBLE_FIELDS = ['rut', 'nombre', 'apellido', 'email', 'fecha_nacimiento', 'especialidad', 'telefono', 'actions'];

function QuickSearchToolbar() {
  const [openRegistro, setOpenRegistro] = useState(false);

  const handleClickOpenRegistro = () => {
    setOpenRegistro(true);
  };

  const handleCloseRegistro = () => {
    setOpenRegistro(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />

      <Button color="primary" startIcon={<AddIcon />} onClick={handleClickOpenRegistro} sx={{ bgcolor: '#EC9C00', '&:hover': { bgcolor: '#EC9C00' }, color: '#000000' }}>
        Agregar entrenador
      </Button>
      <Dialog
        open={openRegistro}
        onClose={handleCloseRegistro}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(0.13, 0.13, 0.13)', // Establece el color de fondo a #222222
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)', // Efecto de desenfoque
          }
        }}
      >
        <DialogContent style={{ paddingTop: '0px' }}>
          <RegistroEntrenadores />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default function Entrenadores() {
  const navigate = useNavigate();
  const [data, setData] = useState({ columns: [], rows: [] });
  const [openEditar, setOpenEditar] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);

  const handleClickOpenEditar = (id) => {
    setIdToEdit(id);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setOpenEditar(false);
    setDataChanged(true);
  };

  useEffect(() => {


    fetch(`${backendUrl}/api/usuarios`)
      .then(response => response.json())
      .then(usuarios => {
        console.log("Usuarios recibidos:", usuarios); // Agrega este log para verificar
        const columns = [
          ...Object.keys(usuarios[0]).filter(key => VISIBLE_FIELDS.includes(key)).map(field => ({
            field,
            headerName: field.charAt(0).toUpperCase() + field.slice(1),
            flex: 1,
            minWidth: 150,
          })),

          {
            field: 'actions',
            headerName: '',
            minWidth: 100,
            renderCell: (params) => [
              <IconButton key="edit" onClick={() => { handleClickOpenEditar(params.row.id_usuario); }}>
                <EditIcon sx={{ color: '#EC9C00' }} />
              </IconButton>,
              <IconButton key="view" onClick={() => { navigate(`/usuarios/${params.row.id_usuario}`); }}>
                <AccountCircleIcon sx={{ color: '#EC9C00' }} />
              </IconButton>,
            ],
          },

        ];

        const rows = usuarios.map(usuarios => ({ ...usuarios, id: usuarios.id_usuario }));
        setData({ columns, rows });
        setDataChanged(false); // Restablece dataChanged a false después de actualizar los datos
      })
      .catch(error => {
        console.error("Error fetching usuarios:", error); // Agrega este log para verificar errores
      });
  }, [dataChanged, navigate]);

  const columns = React.useMemo(
    () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns],
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" mb={4}>Entrenadores</Typography>
      <TableContainer component={Paper} sx={{}}>
        <Box sx={{ height: 'calc(100vh - 200px)', width: '100%', overflow: 'auto' }}>
          <DataGrid
            localeText={{
              toolbarQuickFilterPlaceholder: "Buscar entrenador",
            }}
            {...data}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            columns={columns}
            slots={{ toolbar: QuickSearchToolbar }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#EC9C00',
                color: '#FFFFFF',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(236, 156, 0, 0.2)',
              },
              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: 'rgba(236, 156, 0, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(236, 156, 0, 0.3)',
                },
              },
            }}
          />
          <Dialog
            open={openEditar}
            onClose={handleCloseEditar}
            PaperProps={{
              style: {
                backgroundColor: 'rgb(0.13, 0.13, 0.13)', // Establece el color de fondo a #222222
              },
            }}
            sx={{
              '& .MuiBackdrop-root': {
                backdropFilter: 'blur(4px)', // Efecto de desenfoque
              }
            }}
          >
            <DialogContent style={{ paddingTop: '0px' }}>
              <EditarEntrenadores id={idToEdit} />
            </DialogContent>
          </Dialog>
        </Box>
      </TableContainer>
    </Box>
  );
}
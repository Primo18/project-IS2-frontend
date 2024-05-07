import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'startTime', headerName: 'Start Time', width: 150 },
  { field: 'endTime', headerName: 'End Time', width: 150 },
  { field: 'instructor', headerName: 'Instructor', width: 150 },
  { field: 'client', headerName: 'Client', width: 150 },
];

function Horas() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlDate = urlSearchParams.get('date');
    // Obtener solo la fecha del día, mes y año eliminando la hora
    return urlDate ? urlDate.split('T')[0] : new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    const rows = [
      { id: 1, date: '2024-05-04', startTime: '10:00 AM', endTime: '11:00 AM', instructor: 'John Doe', client: 'Jane Smith' },
      { id: 2, date: '2024-05-04', startTime: '2:00 PM', endTime: '3:00 PM', instructor: 'Alice Johnson', client: 'Bob Brown' },
      { id: 3, date: '2024-05-06', startTime: '9:00 AM', endTime: '10:00 AM', instructor: 'John Doe', client: 'Jane Smith' },
      // Agrega más filas según sea necesario
    ];

    // Filtrar las filas para mostrar solo los datos del día recibido por la URL
    const filteredData = currentDate ? rows.filter(row => row.date === currentDate) : [];

    setFilteredRows(filteredData);
  }, [currentDate]);

  const handlePrevDay = () => {
    // Restar un día a la fecha actual
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    // Sumar un día a la fecha actual
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center">
          <button onClick={handlePrevDay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {'<'}
          </button>
          <span className="mx-4">{currentDate}</span>
          <button onClick={handleNextDay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {'>'}
          </button>
        </div>
        <Box>
          <div style={{ height: 350, width: '100%' }} className="custom-table ">
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Horas;

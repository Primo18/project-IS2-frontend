import { useState, useEffect } from 'react';
import Select from 'react-tailwindcss-select';
import { useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function Add() {
    const options = [
        { value: "12345", label: "Pablo" },
        { value: "11111", label: "Juan" },
        { value: "00331", label: "Pedrito" }
    ];

    const [instructor, setInstructor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [message, setMessage] = useState('');
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const dateParam = searchParams.get('date');
        setSelectedDate(dateParam);
    }, [location.search]);

    const handleChange = value => {
        setInstructor(value);
    };

    const handleStartTimeChange = (time) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time) => {
        setEndTime(time);
    };

    const handleFormSubmit = () => {
        // Aquí puedes enviar los datos al backend
        // Por ahora, solo mostraremos un mensaje de enviado
        const data = {
            selectedDate,
            startTime,
            endTime,
            instructor
        };
        setMessage(`Datos enviados correctamente: ${JSON.stringify(data)}`);
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-4 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-lg">
                <Select
                    placeholder='Ingrese ID o Nombre del Instructor'
                    primaryColor={'purple'}
                    value={instructor}
                    onChange={handleChange}
                    options={options}
                    isSearchable={options}
                />
                <div className="flex justify-between mt-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker label="Hora inicio" value={startTime} onChange={handleStartTimeChange} />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker label="Hora fin" value={endTime} onChange={handleEndTimeChange} />
                    </LocalizationProvider>
                </div>
            </div>
            <button onClick={handleFormSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Agendar</button>
            {message && <div className="mt-4 p-4 bg-green-200 rounded-lg">{message}</div>}
        </div>

    );

}

export default Add;

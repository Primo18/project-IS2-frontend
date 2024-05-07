import { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendario() {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // Aquí era el error, arreglado

    const onChange = (newDate) => {
        setDate(newDate);
        setSelectedDate(newDate); // Actualiza selectedDate al cambiar la fecha
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white shadow-md p-4 rounded-md">
                <Calendar
                    onChange={onChange}
                    value={date}
                    className="border-none"
                    onClickDay={(value) => {
                        setSelectedDate(value);
                    }}
                />
            </div>
            <div className="mt-4 text-center">
                <Link to={`/Add?date=${date.toISOString()}`} className="inline-block">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2">Agendar Nueva Hora</button>
                </Link>
                <Link to={`/Horas?date=${date.toISOString()}`} className="inline-block">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md mx-2">Revisar Horas</button>
                </Link>
            </div>
        </div>
    );
}

export default Calendario;

import './WorkoutRoutine.css';

export const WorkoutRoutine = () => {
    return (
        <div className="container">
            <div className="rutina-header">
                <h2>Mi Rutina de Entrenamiento</h2>
            </div>
            {/* Ejercicios aquí */}
            <div className="ejercicio">
                <div className="ejercicio-header">Press de Banca</div>
                <div className="ejercicio-detalle"><span>Series:</span> 4</div>
                <div className="ejercicio-detalle"><span>Repeticiones:</span> 8</div>
                <div className="ejercicio-detalle"><span>Carga:</span> 80 kg</div>
            </div>
            <div className="ejercicio">
                <div className="ejercicio-header">Peso Muerto</div>
                <div className="ejercicio-detalle"><span>Series:</span> 3</div>
                <div className="ejercicio-detalle"><span>Repeticiones:</span> 6</div>
                <div className="ejercicio-detalle"><span>Carga:</span> 100 kg</div>
            </div>
            <div className="ejercicio">
                <div className="ejercicio-header">Press Militar</div>
                <div className="ejercicio-detalle"><span>Series:</span> 3</div>
                <div className="ejercicio-detalle"><span>Repeticiones:</span> 10</div>
                <div className="ejercicio-detalle"><span>Carga:</span> 50 kg</div>
            </div>
            <div className="ejercicio">
                <div className="ejercicio-header">Remo con Barra</div>
                <div className="ejercicio-detalle"><span>Series:</span> 4</div>
                <div className="ejercicio-detalle"><span>Repeticiones:</span> 8</div>
                <div className="ejercicio-detalle"><span>Carga:</span> 60 kg</div>
            </div>
            <div className="ejercicio">
                <div className="ejercicio-header">Curl de Bíceps</div>
                <div className="ejercicio-detalle"><span>Series:</span> 3</div>
                <div className="ejercicio-detalle"><span>Repeticiones:</span> 12</div>
                <div className="ejercicio-detalle"><span>Carga:</span> 20 kg</div>
            </div>

        </div>
    );
};


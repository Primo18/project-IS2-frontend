import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcono from '../assets/Home.png'
import CalendIcono from '../assets/CalendarioHorario.png';
import AddIcono from '../assets/AddHorario.png';
import VerIcono from '../assets/VerHorarios.png';

const data = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icono: <img src={HomeIcono} alt="Home" />
  },
  {
    id: 2,
    name: "Calendario",
    url: "/calendario",
    icono: <img src={CalendIcono} alt="Calendario" />
  },
  {
    id: 3,
    name: "Usuarios",
    url: "/usuarios",
    icono: <img src={AddIcono} alt="Usuarios" />
  },
  {
    id: 4,
    name: "Info",
    url: "/info",
    icono: <img src={VerIcono} alt="Info" />
  },
];

const DataSlider = ({ toggle }) => {
  return (
    <div className=''>
       {data.map((dataItem) => {
        return (
          <Link to={dataItem.url} key={dataItem.id}>
            <div className={`sidebar ${toggle ? "w-[10rem]" : "w-[10rem]"} `}>
              <div className='mr-4 text-[1.7rem] text-black'>{dataItem.icono}</div>
              <div className={`text-[1rem] text-brown whitespace-pre transition-opacity`} style={{ opacity: toggle ? 0 : 1, transition: 'opacity 0.4s ease-in-out' }}>
                {dataItem.name}
              </div>
            </div>
          </Link>
        );
       })}
    </div>
  );
};

export default DataSlider;

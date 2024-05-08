import { Card, Metric, Text } from '@tremor/react';
import { CardUser } from './CardUser';

function UserInfo() {
  return (
    <div className="mb-10 mt-10 grid grid-cols-3 gap-5"  >
        <CardUser title="RUT" info="12345678-9" />
        <CardUser title="Nombre" info="Juan Perez"/>
        <CardUser title="email" info="juan.perez@example.com"/>
        <CardUser title="Fecha de nacimiento" info="1980-05-15"/>
        <CardUser title="Teléfono" info="123456789"/>
        <CardUser title="Suscripción" info="Mensual"/>
    </div>
  );
}

export default UserInfo;